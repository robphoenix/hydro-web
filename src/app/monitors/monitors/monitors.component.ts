import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor } from '../monitor';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MultipleSelectComponent } from 'src/app/shared/multiple-select/multiple-select.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MonitorDeleteDialogComponent } from '../monitor-delete-dialog/monitor-delete-dialog.component';

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
  monitors: IMonitor[];
  filteredMonitors: IMonitor[];
  searchTerm: string;
  placeholders: FormGroup;
  sidenavOptions: FormGroup;
  hasFetchedMonitors = false;

  private unsubscribe$ = new Subject<void>();

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

  constructor(
    private monitorService: MonitorsService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.sidenavOptions = fb.group({
      fixed: true,
      opened: true,
      mode: 'side',
      top: 64,
    });
    this.placeholders = fb.group({
      search: 'Search Monitors',
      groups: 'Filter Groups',
      categories: 'Filter Categories',
      actions: 'Filter Actions',
    });
  }

  ngOnInit() {
    this.getMonitors();
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
        this.monitors = monitors.sort(this.monitorService.compareMonitors);
        this.filteredMonitors = this.monitors;
        this.categoriesList = this.monitorService.currentCategories(monitors);
        this.groupsList = this.monitorService.currentGroups(monitors);
        // this.actionsList = this.monitorService.currentActions(monitors);
        this.hasFetchedMonitors = true;
      });
  }

  /**
   * Delete a monitor, and notify the user.
   *
   * @param {IDeleteDialogData} data
   * @returns
   * @memberof MonitorsComponent
   */
  // deleteMonitor(monitor: IMonitor) {
  //   const dialogRef = this.dialog.open(MonitorDeleteDialogComponent, {
  //     data: monitor,
  //   });

  //   dialogRef.afterClosed().subscribe((data: IMonitor) => {
  //     this.monitorService.deleteMonitor(data.id).subscribe(() => {
  //       this.monitors = this.monitors.filter((m) => m.id !== data.id);
  //       this.filteredMonitors = this.monitors;
  //       const message = `Monitor deleted: ${data.topic.toUpperCase()}`;
  //       this.snackBar.open(message, '', { duration: 3000 });
  //     });
  //   });
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Filter the list of monitors by user inputs.
   *
   * @memberof MonitorsComponent
   */
  filterMonitors() {
    let filtered: IMonitor[] = this.monitors;
    if (this.searchTerm) {
      filtered = this.monitorService.searchMonitors(filtered, this.searchTerm);
    }
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      filtered = this.monitorService.filterCategories(
        filtered,
        this.selectedCategories,
      );
    }
    if (this.selectedGroups && this.selectedGroups.length > 0) {
      filtered = this.monitorService.filterGroups(
        filtered,
        this.selectedGroups,
      );
    }
    // if (this.selectedActions && this.selectedActions.length > 0) {
    //   filtered = this.monitorService.filterActions(
    //     filtered,
    //     this.selectedActions,
    //   );
    // }
    this.filteredMonitors = filtered;
  }

  /**
   * Clear user inputs currently filtering the monitors.
   *
   * @remarks
   * Does not include text search as this is a separate user input, with its
   * own option to clear.
   *
   * @memberof MonitorsComponent
   */
  clearFilters() {
    this.filteredMonitors = this.monitors;
    this.categorySelect.clearSelectedOptions();
    this.groupSelect.clearSelectedOptions();
    this.actionSelect.clearSelectedOptions();
  }
}
