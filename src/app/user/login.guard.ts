import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private location: Location) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      // return to previous page
      this.location.back();
      return false;
    }
    return true;
  }
}
