import { IAccessToken } from './access-token';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators';
import { Observable, of, interval } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, Role } from './user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.dev';

const httpOptions = {
  responseType: 'text' as 'text', // https://github.com/angular/angular/issues/18586
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

/**
 * Handles all aspects of user authentication.
 *
 * On successful login with the server a JWT access token is returned to the
 * client. This token is stored in local storage and contains an expiry date &
 * time. Every API request to a protected endpoint requires a valid JWT access
 * token. On receiving the access token a refresh interval & a validation
 * interval are started.
 *
 * The refresh interval periodically sends an HTTP request to the server to get a
 * new token with an updated expiration. This new token then replaces the token
 * in local storage. To refresh the JWT access token, the current token needs to
 * still be valid.
 *
 * The validation interval periodically checks the current access token in
 * order to take any necessary actions when it becomes invalid.
 *
 * Both intervals are also initiated on app start up if the user is authenticated.
 *
 * @remarks
 * Expected Behaviour:
 * - Upon successful login, a user will not be logged out of the application
 *   while it is open in the browser, unless they explicitly log out.
 * - If the user closes the application, without explicitly logging out, they
 *   will be logged out when the JWT access token expires.
 * - If the application is closed and then reopened while the JWT access token
 *   is still valid, the user will still be logged in.
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `http://${environment.apiHost}:8080`;
  private loginUrl = `${this.baseUrl}/login`;
  private refreshUrl = `${this.baseUrl}/p/refresh`;

  // The key the JWT token is stored under in local storage
  private accessTokenName = `access_token`;

  private currentUser: IUser = {} as IUser;

  // Interval durations, these are in milliseconds
  //
  // The refresh interval should be less than the expiry duration of the JWT
  // token sent from the server.
  private refreshInterval = 60 * 1000;
  // The validation interval should be very small, otherwise we could create an
  // awkward lag in the UI, between an action and it's reaction in the UI
  private validationInterval = 1 * 1000;

  // Observable subscriptions that need to be unsubscribed from on logout.
  private subscriptions: any;

  // Indicates the user's current authentication status.
  isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
  ) {}

  /**
   * Validates a JWT token. If no token is given, will validate the current
   * access token.
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  isValidToken(token?: string): boolean {
    return !this.jwtHelper.isTokenExpired(token || this.accessToken);
  }

  /**
   * Returns the decoded JWT access token.
   *
   * @returns {IAccessToken}
   * @memberof AuthService
   */
  decodedAccessToken(): IAccessToken {
    return this.jwtHelper.decodeToken(this.accessToken) as IAccessToken;
  }

  /**
   * Attempts to log in with the given username & password.
   * If authentication is successful the returned JWT access token
   * is stored in local storage, the current user is updated, and
   * the subscriptions are initiated.
   *
   * @param {string} username
   * @param {string} password
   * @returns {Observable<string>}
   * @memberof AuthService
   */
  login(username: string, password: string): Observable<string> {
    return this.http
      .post(this.loginUrl, { username, password }, httpOptions)
      .pipe(
        tap((resp) => {
          // set the access token
          this.accessToken = resp;
          // set the isAuthenticated property
          this.isAuthenticated = this.isValidToken(resp);
          // set the current user
          const { username: currentUsername, role } = this.decodedAccessToken();
          this.role = role;
          this.username = currentUsername;
          // initialise the subscriptions
          this.initSubscriptions();
        }),
      );
  }

  /**
   * Initialises the subscriptions.
   *
   * @memberof AuthService
   */
  initSubscriptions() {
    // Refresh the access token
    this.subscriptions = this.refreshToken().subscribe((token: string) => {
      this.accessToken = token;
    });

    // Subscribe to access token validation,
    // logging out when it is not longer valid.
    this.subscriptions.add(
      this.validateToken().subscribe((isValid: boolean) => {
        // Set isAuthenticated property so users of the service are made aware
        // of the current status.
        this.isAuthenticated = isValid;
        // Logout if the token is no longer valid.
        if (!this.isAuthenticated) {
          this.logout();
        }
      }),
    );
  }

  /**
   * Unsubscribes from all subscriptions.
   *
   * @memberof AuthService
   */
  unsubscribeSubscriptions() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Fetches a refreshed access token from the server, repeatedly on an interval.
   *
   * @remarks
   * This requires the current token to be valid.
   *
   * @returns
   * @memberof AuthService
   */
  refreshToken(): Observable<string> {
    return interval(this.refreshInterval).pipe(
      switchMap(() => this.http.get(this.refreshUrl, httpOptions)),
      // TODO: Handle errors
      tap((resp) => {
        return of(resp);
      }),
    );
  }

  /**
   * Validates the current access token on a set interval.
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  public validateToken(): Observable<boolean> {
    return interval(this.validationInterval).pipe(
      map(() => {
        return this.isValidToken();
      }),
    );
  }

  /**
   * Sets the access token in local storage.
   *
   * @memberof AuthService
   */
  set accessToken(token: string) {
    localStorage.setItem(this.accessTokenName, token);
  }

  /**
   * Gets the access token from local storage.
   *
   * @type {string}
   * @memberof AuthService
   */
  get accessToken(): string {
    return localStorage.getItem(this.accessTokenName);
  }

  /**
   * Removes the access token from local storage.
   *
   * @memberof AuthService
   */
  removeAccessToken() {
    localStorage.removeItem(this.accessTokenName);
  }

  /**
   * Logs out the current user.
   *
   * Removes the access token from local storage.
   * Sets isAuthenticated property to false.
   * Sets the current user details to null.
   * Unsubscribes from all subscriptions.
   * Navigates to the login page.
   *
   * @memberof AuthService
   */
  logout(): void {
    this.removeAccessToken();
    this.isAuthenticated = false;
    this.role = null;
    this.username = null;
    if (this.subscriptions) {
      this.unsubscribeSubscriptions();
    }
    this.router.navigate(['/login']);
  }

  /**
   * Sets the current user's username.
   *
   * @memberof AuthService
   */
  set username(value: string) {
    this.currentUser.username = value;
  }

  /**
   * Gets the current user's username.
   * If there is no current user details but the user is authenticated,
   * then we get the username from the valid user token.
   * This can happen if the application is closed and the reopened
   * while the access token is still valid.
   *
   * @type {string}
   * @memberof AuthService
   */
  get username(): string {
    if (this.isAuthenticated && !this.currentUser.username) {
      this.currentUser.username = this.decodedAccessToken().username;
    }
    return this.currentUser.username;
  }

  /**
   * Set's the current user's role.
   *
   * @memberof AuthService
   */
  set role(value: string) {
    this.currentUser.role = value as Role;
  }

  /**
   * Get's the current user's role.
   *
   * @type {string}
   * @memberof AuthService
   */
  get role(): string {
    return this.currentUser.role as string;
  }

  // TODO: Move this into a shared service.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(` handling error: ${error.error}`); // log to console instead
      console.log({ error });
      console.log(`${operation} failed`);
      return of(result as T);
    };
  }
}
