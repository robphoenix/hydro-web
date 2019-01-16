import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
import * as EventBus from 'vertx3-eventbus-client';

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
  private eb: EventBus.EventBus;
  private headers: any;
  public messages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private monitorService: MonitorsService,
  ) {
    this.eb = new EventBus('http://mn2formlt0001d0:6081/eventbus');

    this.headers = {};
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
        this.subscribe();
      });
    });
  }

  subscribe() {
    this.eb.onopen = () => {
      this.eb.registerHandler(
        'result.pub.output',
        this.headers,
        (error, message) => {
          if (error) {
            console.log(error);
          }
          this.messages.push(message);
          console.log(message);
        },
      );
    };
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
