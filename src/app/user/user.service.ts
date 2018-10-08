import { Injectable } from '@angular/core';

/**
 * Handles the current user's profile.
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private favouriteMonitors: number[] = [892, 894];

  /**
   * Gets the id's of the current user's favourite monitors.
   *
   * @returns {number[]}
   * @memberof UserService
   */
  getFavouriteMonitors(): number[] {
    return this.favouriteMonitors;
  }

  /**
   * Adds a monitor id to the current user's favourite monitors.
   *
   * @param {number} id
   * @memberof UserService
   */
  addToFavouriteMonitors(id: number) {
    this.favouriteMonitors.push(id);
  }

  /**
   * Removes the given monitor id from the current user's favourite monitors.
   *
   * @param {number} id
   * @memberof UserService
   */
  removeFromFavouriteMonitors(id: number) {
    this.favouriteMonitors = this.favouriteMonitors.filter(
      (monitor) => monitor !== id,
    );
  }

  constructor() {}
}
