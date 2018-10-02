import { IAccessToken } from './access-token';
import { Injectable } from '@angular/core';
import { IUser } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  private loginPath = `/login`;

  currentUser: IUser;
  redirectUrl: string;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(username: string, password: string): Observable<string> {
    return this.http
      .post(
        `${this.baseUrl}${this.loginPath}`,
        { username, password },
        httpOptions,
      )
      .pipe(
        tap((resp) => {
          localStorage.setItem('access_token', resp);

          const token: IAccessToken = this.jwtHelper.decodeToken(
            resp,
          ) as IAccessToken;
          // tslint:disable-next-line:no-shadowed-variable
          const { username, role } = token;
          this.currentUser = { username, role } as IUser;
        }),
        catchError(this.handleError<any>('login')),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('access_token');
  }
}
