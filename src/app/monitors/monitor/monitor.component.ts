import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IMonitorData, IEsperItem } from '../monitor-data';

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
  dataSource: { [key: string]: string }[];
  displayedColumns: string[];
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
  }

  /**
   * Get the current monitors.
   *
   * @memberof MonitorsComponent
   */
  getMonitors() {
    this.monitorService.getMonitors().subscribe((monitors: IMonitor[]) => {
      this.monitors = monitors;
      this.setCategories();
    });
  }

  /**
   * Sets a complete list of categories derived from the current monitors.
   *
   * @private
   * @memberof MonitorsComponent
   */
  private setCategories() {
    const categories: Set<string> = new Set();
    this.monitors.forEach((monitor: IMonitor) => {
      monitor.categories.forEach((category) =>
        categories.add(category.name.toLowerCase()),
      );
    });
    this.categoriesList = Array.from(categories).sort();
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
