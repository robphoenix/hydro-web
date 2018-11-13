import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, ICategory, IGroup, IAction, IActionGroup } from '../monitor';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class MonitorsComponent implements OnInit, OnDestroy {
  title = 'monitors';
  filteredMonitors: IMonitor[];
  monitors: IMonitor[];

  searchTerm: string;

  categories = new FormControl();
  categoriesList: string[];
  selectedCategories: string[];

  groups = new FormControl();
  groupsList: string[];
  selectedGroups: string[];

  actions = new FormControl();
  actionsList;
  selectedActions: string[];

  private unsubscribe$ = new Subject<void>();

  constructor(private monitorService: MonitorsService) {}

  ngOnInit() {
    this.getMonitors();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchMonitors(searchTerm: string) {
    const regex: RegExp = new RegExp(searchTerm, 'gi');
    this.monitors = this.filteredMonitors.filter((monitor: IMonitor) => {
      const categories = monitor.categories.reduce(
        (prev, curr) => `${prev} ${curr.value}`,
        '',
      );
      return `${monitor.topic.toLowerCase()} ${monitor.queryDescription.toLowerCase()} ${categories}`.match(
        regex,
      );
    });
  }

  /**
   * Get the current monitors.
   *
   * @memberof MonitorsComponent
   */
  getMonitors() {
    this.monitorService
      .getMonitors()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((monitors: IMonitor[]) => {
        this.monitors = monitors.sort(
          (a, b) =>
            a.topic.toLowerCase() < b.topic.toLowerCase() ? -1 : 1 || 0,
        );
        this.filteredMonitors = this.monitors;
        this.categoriesList = this.currentCategories(monitors);
        this.groupsList = this.currentGroups(monitors);
        this.actionsList = this.currentActions(monitors);
      });
  }

  filterMonitors(): IMonitor[] {
    let filtered: IMonitor[] = this.monitors;
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
    const filterFn = (monitor: IMonitor) => {
      const currentActions = monitor.actionGroups.reduce(
        (prev: string[], curr: IActionGroup) => [
          ...prev,
          ...curr.actions.map((a) => a.name),
        ],
        [],
      );
      return this.selectedActions.every((action: string) =>
        currentActions.includes(action),
      );
    };

    return monitors.filter(filterFn);
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
    const allActions: string[] = monitors
      .reduce((prev: IAction[][], curr: IMonitor) => {
        return [
          ...prev,
          ...curr.actionGroups.map((a: IActionGroup) => a.actions),
        ];
      }, [])
      .reduce((prevActions: string[], currActions: IAction[]) => {
        return [
          ...prevActions,
          ...currActions.map((action: IAction) => action.name),
        ];
      }, []);
    // remove duplicate actions
    return Array.from(new Set(allActions)).sort();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedActions = [];
    this.selectedCategories = [];
    this.selectedGroups = [];
  }
}
