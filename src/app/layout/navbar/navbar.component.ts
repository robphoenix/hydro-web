import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  name = '../assets/img/hydro-uppercase.png';
  logo = '../assets/img/hydroelectric.png';

  constructor(public authService: AuthService) {}
}
