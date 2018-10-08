import { IAccessToken } from './access-token';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, Role } from './user';

const httpOptions = {
  responseType: 'text' as 'text', // https://github.com/angular/angular/issues/18586
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

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

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.accessToken);
  }

  decodedAccessToken(): IAccessToken {
    return this.jwtHelper.decodeToken(this.accessToken) as IAccessToken;
  }

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
        catchError(this.handleError<any>('login')),
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

  refreshToken(): Observable<string> {
    if (!this.isAuthenticated()) {
      return of(``);
    }
    return this.http.get(this.refreshUrl, httpOptions).pipe(
      tap((resp) => {
        this.accessToken = resp;
      }),
      catchError(this.handleError<any>('login')),
    );
  }

  set accessToken(token: string) {
    localStorage.setItem(this.accessTokenName, token);
  }

  get accessToken(): string {
    return localStorage.getItem(this.accessTokenName);
  }

  removeAccessToken() {
    localStorage.removeItem(this.accessTokenName);
  }

  logout(): void {
    this.role = null;
    this.username = null;
    this.removeAccessToken();
    this.clearRefreshTimer();
  }

  set username(value: string) {
    this.currentUser.username = value;
  }
  get username(): string {
    if (this.isAuthenticated() && !this.currentUser.username) {
      this.currentUser.username = this.decodedAccessToken().username;
    }
    return this.currentUser.username;
  }

  set role(value: string) {
    this.currentUser.role = value as Role;
  }
  get role(): string {
    return this.currentUser.role as string;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
