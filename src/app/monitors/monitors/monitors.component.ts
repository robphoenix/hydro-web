import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, ICategory, IGroup, IAction, IActionGroup } from '../monitor';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
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
  sidenavOptions: FormGroup;
  showClearFilters = false;
  fetchedMonitors = false;

  monitors: IMonitor[];
  filteredMonitors: IMonitor[];
  currentMonitors: IMonitor[] = [];

  searchTerm: string;

  @ViewChild('categorySelect')
  private categorySelect: MultipleSelectComponent;
  categories = new FormControl();
  categoriesList: string[];
  selectedCategories: string[];

  @ViewChild('groupSelect')
  private groupSelect: MultipleSelectComponent;
  groups = new FormControl();
  groupsList: string[];
  selectedGroups: string[];

  @ViewChild('actionSelect')
  private actionSelect: MultipleSelectComponent;
  actions = new FormControl();
  actionsList;
  selectedActions: string[];

  private unsubscribe$ = new Subject<void>();

  constructor(private monitorService: MonitorsService, fb: FormBuilder) {
    this.sidenavOptions = fb.group({
      bottom: 0,
      fixed: true,
      top: 64,
    });
  }

  ngOnInit() {
    this.getMonitors();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filterMonitors() {
    this.showClearFilters = false;
    let filtered: IMonitor[] = this.monitors;
    if (this.searchTerm) {
      filtered = this.searchMonitors(filtered);
    }
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.showClearFilters = true;
      filtered = this.filterCategories(filtered);
    }
    if (this.selectedGroups && this.selectedGroups.length > 0) {
      this.showClearFilters = true;
      filtered = this.filterGroups(filtered);
    }
    if (this.selectedActions && this.selectedActions.length > 0) {
      this.showClearFilters = true;
      filtered = this.filterActions(filtered);
    }
    this.currentMonitors = filtered;
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
      const currentActions: string[] = monitor.actionGroups.reduce(
        (prev: string[], curr: IActionGroup) => [
          ...prev,
          ...curr.actions.map((action: IAction) => action.name),
        ],
        [],
      );
      return this.selectedActions.every((selected: string) =>
        currentActions.includes(selected),
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
        this.currentMonitors = this.monitors;
        this.categoriesList = this.currentCategories(monitors);
        this.groupsList = this.currentGroups(monitors);
        this.actionsList = this.currentActions(monitors);
        this.fetchedMonitors = true;
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
