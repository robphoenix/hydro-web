import { Component } from '@angular/core';
import { AuthService } from '../../user/auth.service';

/**
 * The main header & toolbar.
 *
 * @export
 * @class HeaderComponent
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logo = '../assets/img/hydro_logo_white.png';

  constructor(public authService: AuthService) {}

  /**
   * Log out the current user and route to `/login`
   *
   * @memberof LayoutHeaderComponent
   */
  logOut(): void {
    this.authService.logout();
  }
}
