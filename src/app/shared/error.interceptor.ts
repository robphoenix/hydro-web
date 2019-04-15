import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../user/auth.service';
import { IErrorMessage } from './error-message';

/**
 * Intercepts all HTTP requests and catches any errors.
 *
 * @export
 * @class ErrorInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error({ error });
        if (!error.status) {
          // we don't know what's happened, maybe the internet broke?
          return throwError({
            errorCode: 'UNKNOWN_ERROR',
            message: 'Unknown error. Please check your network connection.',
            cause: 'Unknown error. Please check your network connection.',
          } as IErrorMessage);
        }

        if (error.status === 401) {
          // auto logout if failed authentication response returned from api
          this.authService.logout();
        }

        return throwError(error.error as IErrorMessage);
      }),
    );
  }
}
