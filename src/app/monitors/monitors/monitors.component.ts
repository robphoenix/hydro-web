import { UserService } from '../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor } from '../monitor';

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

  getLiveMonitors() {
    this.monitorService.getLiveMonitors().subscribe((monitors) => {
      this.liveMonitors = monitors;
    });
  }

  getUserFavouriteMonitors() {
    const favourites: number[] = this.userService.getFavouriteMonitors();
    favourites.forEach((id) => {
      this.monitorService.getLiveMonitorById(id).subscribe((monitor) => {
        this.favouriteMonitors.push(monitor);
      });
    });
  }
}
