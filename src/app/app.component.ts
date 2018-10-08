import { AuthService } from './user/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hydro-poc';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.refreshToken().subscribe();
    this.authService.startRefreshTimer();
  }

  ngOnDestroy(): void {
    this.authService.clearRefreshTimer();
  }
}
