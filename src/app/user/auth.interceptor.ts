import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Intercepts all HTTP requests to add the authenticated JWT access token.
 * This token is required by the API for all requests.
 *
 * @remarks
 * The auth0/angular2-jwt library claims to do this automatically, although
 * this does not bear out and the JWT token was not included as intended.
 *
 * @export
 * @class AuthInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(
            this.authService.accessTokenName,
          )}`,
        },
      }),
    );
  }
}
