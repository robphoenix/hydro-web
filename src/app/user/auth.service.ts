import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: IUser;
  redirectUrl: string;

  constructor() {}

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(username: string, password: string): void {
    if (username === 'admin') {
      this.currentUser = {
        id: 1,
        username: username,
        isAdmin: true,
      };
      return;
    }
    this.currentUser = {
      id: 2,
      username: username,
      isAdmin: false,
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
