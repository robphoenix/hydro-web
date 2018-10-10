import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Intercepts all HTTP requests to add the authenticated JWT access token.
 * This token is required by the API for all requests.
 *
 * @remarks
 * The auth0/angular2-jwt library claims to do this automatically, although
 * this does not bear out and the JWT token was not included as intended.
 * Also we want to consider the `login` endpoint corner case.
 *
 * @export
 * @class AuthInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const updatedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.accessToken}`,
      },
    });

    return next.handle(updatedReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
        }
        const message = JSON.parse(err.error)[0].message;
        const error = message || err.statusText;
        return throwError(error);
      }),
    );
  }
}
