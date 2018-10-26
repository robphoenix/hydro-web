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
  monitors: IMonitor[];
  searchTerm: string;
  columnsToDisplay = ['topic', 'queryDescription', 'categories'];

  constructor(private monitorService: MonitorsService) {}

  ngOnInit() {
    this.getMonitors();
  }

  /**
   * Get the list of Live monitors.
   *
   * @memberof MonitorsComponent
   */
  getMonitors() {
    this.monitorService.getMonitors().subscribe((monitors) => {
      this.monitors = monitors;
    });
  }
}
