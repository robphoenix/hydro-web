import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Guards all routes that require basic authentication.
 * Routes to `login` if not authenticated.
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Returns whether the user is authenticated.
   * Routes to `login` if not.
   *
   * @returns {boolean}
   * @memberof AuthGuard
   */
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
