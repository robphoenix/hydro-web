import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

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
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // We're in an HTTP request, we can't inject the AuthService,
    // so we get the access_token from local storage.
    const token: string = localStorage.getItem('access_token');

    if (!token) {
      return next.handle(req);
    }

    const updatedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(updatedReq);
  }
}
