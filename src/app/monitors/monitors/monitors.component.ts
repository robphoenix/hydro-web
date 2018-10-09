import { UserService } from '../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor } from '../monitor';

/**
 * Lists all monitors, displaying a single monitor.
 *
 * @export
 * @class MonitorsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent implements OnInit {
  title = 'Monitors';
  liveMonitors: IMonitor[];
  favouriteMonitors: IMonitor[] = [];

  liveMonitorsTitle = 'Live';
  favouriteMonitorsTitle = 'Favourites';

  searchTerm: string;

  constructor(
    private monitorService: MonitorsService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getLiveMonitors();
    this.getUserFavouriteMonitors();
  }

  /**
   * Get the list of Live monitors.
   *
   * @memberof MonitorsComponent
   */
  getLiveMonitors() {
    this.monitorService.getLiveMonitors().subscribe((monitors) => {
      this.liveMonitors = monitors;
    });
  }

  /**
   * Get the user's favourite monitors.
   *
   * @memberof MonitorsComponent
   */
  getUserFavouriteMonitors() {
    const favourites: number[] = this.userService.getFavouriteMonitors();
    favourites.forEach((id) => {
      this.monitorService.getLiveMonitorById(id).subscribe((monitor) => {
        this.favouriteMonitors.push(monitor);
      });
    });
  }
}
