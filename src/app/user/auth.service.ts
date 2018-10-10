import { IAccessToken } from './access-token';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, Role } from './user';
import { Router } from '@angular/router';

const httpOptions = {
  responseType: 'text' as 'text', // https://github.com/angular/angular/issues/18586
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

/**
 * Handles all aspects of user authentication.
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `http://mn2splpfa001sl0:8080`;
  private loginUrl = `${this.baseUrl}/login`;
  private refreshUrl = `${this.baseUrl}/p/refresh`;
  private refreshTimer;
  private refreshInterval = 60 * 1000; // in milliseconds
  private accessTokenName = `access_token`;
  private currentUser: IUser = {} as IUser;
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
  ) {}

  /**
   * Returns a boolean indicating whether the current user
   * is authenticated.
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.accessToken);
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
   * the token refresh timer is started.
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
          this.accessToken = resp;
          // tslint:disable-next-line:no-shadowed-variable
          const { username, role } = this.jwtHelper.decodeToken(resp);
          this.role = role;
          this.username = username;
          this.startRefreshTimer();
        }),
      );
  }

  startRefreshTimer() {
    this.refreshTimer = setInterval(
      () => this.refreshToken().subscribe(),
      this.refreshInterval,
    );
  }

  clearRefreshTimer() {
    clearInterval(this.refreshTimer);
  }

  /**
   * If current user is authenticated the access token is refreshed repeatedly,
   * on a timer, and the token in local storage is updated. This requires the current
   * access token to be valid.
   *
   * @returns {Observable<string>}
   * @memberof AuthService
   */
  refreshToken(): Observable<string> {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return of(``);
    }
    return this.http.get(this.refreshUrl, httpOptions).pipe(
      tap((resp) => {
        this.accessToken = resp;
      }),
      catchError(this.handleError<any>('refresh token')),
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
   * Sets the current user details to null, removes the access token from
   * local storage, and clears the refresh timer.
   *
   * @memberof AuthService
   */
  logout(): void {
    this.role = null;
    this.username = null;
    this.removeAccessToken();
    this.clearRefreshTimer();
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
    if (this.isAuthenticated() && !this.currentUser.username) {
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
