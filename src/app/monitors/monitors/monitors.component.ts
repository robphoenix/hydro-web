import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, ICategory, IGroup, IAction, IActionGroup } from '../monitor';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MultipleSelectComponent } from 'src/app/shared/multiple-select/multiple-select.component';

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

  @ViewChild('categorySelect')
  private categorySelect: MultipleSelectComponent;
  categories = new FormControl();
  categoriesList: string[];

  @ViewChild('groupSelect')
  private groupSelect: MultipleSelectComponent;
  groups = new FormControl();
  groupsList: string[];

  @ViewChild('actionSelect')
  private actionSelect: MultipleSelectComponent;
  actions = new FormControl();
  actionsList;

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

  filterCategories(selectedOptions: string[]) {
    this.monitors = this.filteredMonitors.filter((monitor: IMonitor) => {
      return selectedOptions.every((option: string) =>
        monitor.categories
          .map((category: ICategory) => category.value)
          .includes(option),
      );
    });
  }

  filterGroups(selectedOptions: string[]) {
    this.monitors = this.filteredMonitors.filter((monitor: IMonitor) => {
      return selectedOptions.every((option: string) =>
        monitor.groups.map((group: IGroup) => group.name).includes(option),
      );
    });
  }

  filterActions(selectedOptions: string[]) {
    const filterFn: (monitor: IMonitor) => boolean = (monitor: IMonitor) => {
      const currentActions: string[] = monitor.actionGroups.reduce(
        (prev: string[], curr: IActionGroup) => [
          ...prev,
          ...curr.actions.map((action: IAction) => action.name),
        ],
        [],
      );
      return selectedOptions.every((option: string) =>
        currentActions.includes(option),
      );
    };
    this.monitors = this.filteredMonitors.filter(filterFn);
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
    this.monitors = this.filteredMonitors;
    this.categorySelect.clearSelectedOptions();
    this.groupSelect.clearSelectedOptions();
    this.actionSelect.clearSelectedOptions();
  }
}
