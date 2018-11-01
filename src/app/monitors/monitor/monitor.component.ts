import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor, IMonitorData, IEsperItem } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  categories = new FormControl();
  categoriesList: string[];
  selectedCategories: string[];

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
    this.monitorService.getMonitors().subscribe((monitors: IMonitor[]) => {
      this.monitors = monitors;
      const categories: Set<string> = new Set();
      monitors.forEach((monitor: IMonitor) => {
        monitor.categories.forEach((category) =>
          categories.add(category.value),
        );
      });
      this.categoriesList = Array.from(categories);
    });
  }

  /**
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: string = params.get('id');
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
      const id: string = params.get('id');
      this.monitorService.getMonitorData(id).subscribe((data: IMonitorData) => {
        if (data) {
          this.tableHeaders = ['Time', ...data.headers];
          this.data = this.transformMonitorData(data);
        }
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
    return monitorData.esperItems.map((esperItems: IEsperItem[]) => {
      // initialise the data object with the monitor timestamp
      const time: Date = new Date(monitorData.timeStamp);
      const data: { [key: string]: string } = {
        Time: time.toLocaleString('en-GB'),
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
