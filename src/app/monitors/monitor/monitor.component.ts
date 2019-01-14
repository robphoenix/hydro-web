import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
// import * as vertx from 'vertx3-eventbus-client';
// import * as EventBus from 'vertx3-eventbus-client';
// import EventBus from 'vertx3-eventbus-client';

/**
 * Describes a single monitor.
 *
 * @export
 * @class MonitorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit {
  monitor: IMonitor;
  // private eb;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private monitorService: MonitorsService,
  ) {
    // this.eb = new EventBus(`http://url`);
    // this.eb.onopen = () => {
    //   this.eb.registerHandler('some-address', (error, message) => {
    //     console.log({ message });
    //     console.log({ error });
    //   });
    // };
  }

  ngOnInit() {
    this.getMonitor();
  }

  /**
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.monitorService.getMonitor(id).subscribe((monitor) => {
        this.monitor = monitor;
      });
    });
  }

  /**
   * Navigates to the previous URL.
   *
   * @memberof MonitorComponent
   */
  goBack() {
    this.location.back();
  }
}
