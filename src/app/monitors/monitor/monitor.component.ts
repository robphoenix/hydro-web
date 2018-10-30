import { IMonitorData, EsperItem } from './../monitor-data';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';

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
  data: { [key: string]: string }[];
  tableHeaders: string[];
  title = 'Monitors';
  monitors: IMonitor[];
  searchTerm: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private monitorService: MonitorsService,
  ) {}

  ngOnInit() {
    this.getMonitors();
    this.getMonitor();
    this.getMonitorData();
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

  /**
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.monitorService.getMonitorById(id).subscribe((monitor) => {
        this.monitor = monitor;
      });
    });
  }

  /**
   * Get the monitor's data.
   *
   * @memberof MonitorComponent
   */
  getMonitorData() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.monitorService
        .getMonitorData(id)
        .subscribe((monitorData: IMonitorData) => {
          this.tableHeaders = ['Time', ...monitorData.headers];
          this.data = this.transformMonitorData(monitorData);
        });
    });
  }

  /**
   * Transforms the nested monitor data array
   * into a single array of objects
   *
   * @param {IMonitorData} monitorData
   * @returns {{ [key: string]: string }[]}
   * @memberof MonitorComponent
   */
  transformMonitorData(monitorData: IMonitorData): { [key: string]: string }[] {
    return monitorData.esperItems.map((esperItems: EsperItem[]) => {
      // initialise the data object with the monitor timestamp
      const data: { [key: string]: string } = {
        Time: monitorData.timeStamp,
      };
      // transform the array of esperItems into
      // key:value pairs and add to the data object
      esperItems.forEach((item) => {
        data[item['key']] = item['value'];
      });
      return data;
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
