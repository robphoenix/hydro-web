import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hydro-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  logo = '../assets/img/hydro-power.png';

  constructor(public authService: AuthService, public router: Router) {}

  public get allowsEdit(): boolean {
    return this.authService.allowsEdit;
  }

  public get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  public logout() {
    this.authService.logout();
  }
}
