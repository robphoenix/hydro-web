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
        if (error.status === 401) {
          // auto logout if failed authentication response returned from api
          this.authService.logout();
        }
        let msg: IErrorMessage;

        if (error.status === 404) {
          const { message } = error;
          msg = {
            errorCode: `${error.status}`,
            message: message,
            cause: error.statusText,
          } as IErrorMessage;
        } else if (error.error.length) {
          // The backend returned an unsuccessful response code.
          // Until otherwise necessary, we're only going to deal
          // with the first error message sent back from the server
          msg = error.error[0] as IErrorMessage;
        } else if (!error.status) {
          // we don't know what's happened, maybe the internet broke?
          msg = {
            errorCode: 'UNKNOWN_ERROR',
            message: 'Unknown error. Please check your network connection.',
            cause: 'Unknown error. Please check your network connection.',
          } as IErrorMessage;
        } else {
          // A client-side or network error occurred
          msg = {
            errorCode: `${error.status}`,
            message: error.message,
            cause: error.statusText,
          } as IErrorMessage;
        }
        return throwError(msg);
      }),
    );
  }
}
