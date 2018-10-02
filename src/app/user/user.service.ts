import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private favouriteMonitors: number[] = [892, 894];

  getFavouriteMonitors(): number[] {
    return this.favouriteMonitors;
  }

  addToFavouriteMonitors(id: number) {
    this.favouriteMonitors.push(id);
  }

  removeFromFavouriteMonitors(id: number) {
    this.favouriteMonitors = this.favouriteMonitors.filter(
      (monitor) => monitor !== id,
    );
  }

  constructor() {}
}
