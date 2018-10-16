import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  logo = '../assets/img/hydro_logo_white.png';
  isAuthenticated = false;

  private subscription: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .validateToken()
      .subscribe((isValid: boolean) => {
        this.isAuthenticated = isValid;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Log out the current user and route to `/login`
   *
   * @memberof LayoutHeaderComponent
   */
  logOut(): void {
    this.isAuthenticated = false;
    this.authService.logout();
  }
}
