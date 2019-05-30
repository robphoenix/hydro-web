import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hydro-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // name = '../assets/img/hydro-uppercase.png';
  logo = '../assets/img/hydro-power.png';

  constructor(public authService: AuthService, public router: Router) {}
}
