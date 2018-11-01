import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor } from '../monitor';
import { FormControl } from '@angular/forms';

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
  monitors: IMonitor[];

  searchTerm: string;

  categories = new FormControl();
  categoriesList: string[];
  selectedCategories: string[];

  constructor(private monitorService: MonitorsService) {}

  ngOnInit() {
    this.getMonitors();
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
        categories.add(category.value.toLowerCase()),
      );
    });
    this.categoriesList = Array.from(categories).sort();
  }
}
