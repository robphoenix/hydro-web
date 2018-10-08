import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  logo = '../assets/img/hydro_logo_white.png';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
