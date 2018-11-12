import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, ICategory, IGroup, IAction } from '../monitor';
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
  title = 'monitors';
  monitors: IMonitor[];

  searchTerm: string;

  categories = new FormControl();
  categoriesList: string[];
  selectedCategories: string[];

  groups = new FormControl();
  groupsList: string[];
  selectedGroups: string[];

  actions = new FormControl();
  actionsList: string[];
  selectedActions: string[];

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
      this.monitors = monitors.sort(
        (a, b) => (a.topic.toLowerCase() < b.topic.toLowerCase() ? -1 : 1 || 0),
      );
      this.categoriesList = this.currentCategories(monitors);
      this.groupsList = this.currentGroups(monitors);
      this.actionsList = this.currentActions(monitors);
    });
  }

  filterMonitors(): IMonitor[] {
    let filtered: IMonitor[] = this.monitors;
    if (this.searchTerm) {
      filtered = this.searchMonitors(filtered);
    }
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      filtered = this.filterCategories(filtered);
    }
    if (this.selectedGroups && this.selectedGroups.length > 0) {
      filtered = this.filterGroups(filtered);
    }
    if (this.selectedActions && this.selectedActions.length > 0) {
      filtered = this.filterActions(filtered);
    }
    return filtered;
  }

  searchMonitors(monitors: IMonitor[]): IMonitor[] {
    const regex: RegExp = new RegExp(this.searchTerm, 'gi');
    return monitors.filter((monitor: IMonitor) => {
      const categories = monitor.categories.reduce(
        (prev, curr) => `${prev} ${curr.value}`,
        '',
      );
      return `${monitor.topic.toLowerCase()} ${monitor.queryDescription.toLowerCase()} ${categories}`.match(
        regex,
      );
    });
  }

  filterCategories(monitors: IMonitor[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return this.selectedCategories.every((selected: string) =>
        monitor.categories
          .map((category: ICategory) => category.value)
          .includes(selected),
      );
    });
  }

  filterGroups(monitors: IMonitor[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return this.selectedGroups.every((selected: string) =>
        monitor.groups.map((group: IGroup) => group.name).includes(selected),
      );
    });
  }

  filterActions(monitors: IMonitor[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return this.selectedActions.every((action: string) =>
        monitor.actions.map((a: IGroup) => a.name).includes(action),
      );
    });
  }

  /**
   * Sets a complete list of categories derived from the current monitors.
   *
   * @private
   * @memberof MonitorsComponent
   */
  private currentCategories(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.categories.map((category: ICategory) => category.value),
          ],
          [],
        ),
      ),
    ).sort();
  }

  private currentGroups(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.groups.map((group: IGroup) => group.name),
          ],
          [],
        ),
      ),
    ).sort();
  }

  private currentActions(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.actions.map((action: IAction) => action.name),
          ],
          [],
        ),
      ),
    ).sort();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedActions = [];
    this.selectedCategories = [];
    this.selectedGroups = [];
  }
}
