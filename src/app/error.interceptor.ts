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
import { AuthService } from './user/auth.service';
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
          // auto logout if 401 response returned from api
          this.authService.logout();
        }

        let msg: string;

        if (error.error.length) {
          // The backend returned an unsuccessful response code.
          // Until otherwise necessary, we're only going to deal
          // with the first error message sent back from the server
          const [{ message }] = error.error as IErrorMessage[];
          msg = message;
        } else if (!error.status) {
          msg = 'Unknown error. Please check your network connection.';
        } else {
          // A client-side or network error occurred. Handle it accordingly.
          msg = error.message;
        }
        // return an observable with a user-facing error message
        return throwError(msg);
      }),
    );
  }
}
