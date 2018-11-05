import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from '../../environments/environment';

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
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!environment.mustAuthenticate) {
      return true;
    }
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}
