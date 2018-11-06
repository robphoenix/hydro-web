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
      this.monitors = monitors;
      this.categoriesList = this.allCategories(monitors);
      this.groupsList = this.allGroups(monitors);
      this.actionsList = this.allActions(monitors);
    });
  }

  /**
   * Sets a complete list of categories derived from the current monitors.
   *
   * @private
   * @memberof MonitorsComponent
   */
  private allCategories(monitors: IMonitor[]): string[] {
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

  private allGroups(monitors: IMonitor[]): string[] {
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

  private allActions(monitors: IMonitor[]): string[] {
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
}
