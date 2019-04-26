import { AuthService } from './user/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'hydro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.authService.unsubscribeAll();
  }
}
