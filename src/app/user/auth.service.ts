import { IAccessToken } from './access-token';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, interval, Subject, Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from './user';
import { Router } from '@angular/router';
import { ILoginResponse } from './login-response';
import { IGroup } from '../monitors/monitor';

const httpOptions = {
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
  readonly baseUrl = `http://mn2formlt0001d0:6080`;
  readonly loginUrl = `${this.baseUrl}/login`;
  readonly refreshUrl = `${this.baseUrl}/p/refresh`;

  // The key the JWT token is stored under in local storage
  readonly accessTokenName = 'access_token';

  // Interval durations, these are in milliseconds
  //
  // The refresh interval should be less than the expiry duration of the JWT
  // token sent from the server.
  private refreshInterval = 60 * 1000;
  // The validation interval should be very small, otherwise we could create an
  // awkward lag in the UI, between an action and it's reaction in the UI
  private validationInterval = 1 * 1000;

  // Observable subscriptions that need to be unsubscribed from on logout.
  private _refresh$: Subscription;
  private _validate$: Subscription;
  // Unsubscribe observable to notify when to unsubscribe from a subscription,
  // this should be used with `takeUntil` in any subscriptions.
  private unsubscribe: Subject<void> = new Subject();

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
  ) {}

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
  login(username: string, password: string): Observable<ILoginResponse> {
    return this.http
      .post(this.loginUrl, { username, password }, httpOptions)
      .pipe(
        tap((resp: ILoginResponse) => {
          this.setup(resp);
        }),
      );
  }

  private setup(resp: ILoginResponse): void {
    const { token } = resp;
    if (!this.jwtHelper.isTokenExpired(token)) {
      // set the access token
      localStorage.setItem(this.accessTokenName, token);
      // initialise the subscriptions
      this.initSubscriptions();
    }
  }

  /**
   * Getter for private refresh subscription.
   *
   * @readonly
   * @memberof AuthService
   */
  get refresh$() {
    return this._refresh$;
  }

  /**
   * Getter for private validate subscription.
   *
   * @readonly
   * @memberof AuthService
   */
  get validate$() {
    return this._validate$;
  }

  /**
   * Initialises the subscriptions.
   *
   * @memberof AuthService
   */
  initSubscriptions() {
    // Only start subscriptions if logged in
    if (!this.isLoggedIn) {
      return;
    }

    // Refresh the access token, and add it to the subscriptions.
    this._refresh$ = this.refreshToken()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (value: ILoginResponse) => {
          const { token: refreshToken } = value;
          localStorage.setItem(this.accessTokenName, refreshToken);
        },
        (error) => console.error(`[refreshToken] ${error}`),
        () => console.log('[refreshToken] complete'),
      );

    // Subscribe to access token validation, and add it to the subscriptions.
    this._validate$ = this.validateToken()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (isValid: boolean) => {
          if (!isValid) {
            this.logout();
          }
        },
        (error) => console.error(`[validateToken] ${error}`),
        () => console.log('[validateToken] complete'),
      );
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
  refreshToken(): Observable<ILoginResponse> {
    return interval(this.refreshInterval).pipe(
      switchMap(() => this.http.get(this.refreshUrl, httpOptions)),
      tap((resp: ILoginResponse) => resp),
    );
  }

  /**
   * Validates the current access token on a set interval.
   * Logging out if the access token is invalid.
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  public validateToken(): Observable<boolean> {
    return interval(this.validationInterval).pipe(
      map(() => {
        return !this.jwtHelper.isTokenExpired(
          localStorage.getItem(this.accessTokenName),
        );
      }),
    );
  }

  /**
   * Notify subscriptions to unsubscribe. This does this by emitting a next()
   * notification, and then complete() the unsubscribe observable.
   *
   * @memberof AuthService
   */
  unsubscribeAll() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Logs out the current user.
   *
   * Sets isLoggedIn property to false.
   * Removes the access token from local storage.
   * Sets the current user details to null.
   * Unsubscribes from any subscriptions.
   * Navigates to the login page.
   *
   * @memberof AuthService
   */
  logout(): void {
    localStorage.removeItem(this.accessTokenName);

    this.unsubscribeAll();

    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(
      localStorage.getItem(this.accessTokenName),
    );
  }

  /**
   * Gets the current user's username from the JWT token in local storage.
   *
   * @type {string}
   * @memberof AuthService
   */
  get username(): string {
    const { username } = this.jwtHelper.decodeToken(
      localStorage.getItem(this.accessTokenName),
    ) as IAccessToken;
    return username;
  }

  get userGroups(): IGroup[] {
    const { groups } = this.jwtHelper.decodeToken(
      localStorage.getItem(this.accessTokenName),
    ) as IAccessToken;
    return groups;
  }

  /**
   * Gets the current user's display name from local storage.
   *
   * @type {string}
   * @memberof AuthService
   */
  get userDisplayName(): string {
    const { displayName } = this.jwtHelper.decodeToken(
      localStorage.getItem(this.accessTokenName),
    ) as IAccessToken;
    return displayName;
  }
}
