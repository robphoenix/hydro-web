import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, MonitorStatus, MonitorType } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { MonitorsTypeToggleComponent } from '../monitors-type-toggle/monitors-type-toggle.component';

@Component({
  selector: 'hydro-view-monitors',
  templateUrl: './view-monitors.component.html',
  styleUrls: ['./view-monitors.component.scss'],
})
export class ViewMonitorsComponent implements OnInit {
  currentMonitors: IMonitor[] = [];
  filteredMonitors: IMonitor[] = [];
  standardMonitors: IMonitor[] = [];
  archivedMonitors: IMonitor[] = [];
  systemMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];
  canToggleStatus = true;
  lastMonitorsType: MonitorType | MonitorStatus = MonitorType.Standard;
  totalNumberOfMonitors: number;
  public dataSource: MatTableDataSource<IMonitor>;
  public displayedColumns = ['monitor', 'actions', 'categories', 'menu'];
  public _monitorsStatus: string;

  @ViewChild(MonitorsTypeToggleComponent)
  typeToggle: MonitorsTypeToggleComponent;

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(
    private monitorsService: MonitorsService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.filteredMonitors = this.currentMonitors;
    this.updateMonitorsStatus();

    const lastViewed: string = this.userService.lastMonitorsType;
    this.lastMonitorsType = lastViewed
      ? (lastViewed as MonitorType) || (lastViewed as MonitorStatus)
      : this.lastMonitorsType;

    this.monitorsService.getMonitors().subscribe(
      () => this.getMonitors(),
      (error: IErrorMessage) => {
        const { errorCode } = error;
        let { message } = error;
        const { cause } = error;
        const title = `Error fetching monitors`;
        if (errorCode === errorNoAvailableMonitors) {
          message = `There are no monitors currently available to view. Please add a monitor.`;
        }

        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause },
          maxWidth: `800px`,
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl(`/monitors/add`);
        });
      },
    );
  }

  private get isCurrentlyArchivedMonitors() {
    return this.lastMonitorsType === MonitorStatus.Archived;
  }

  private getMonitors() {
    this.onMonitorsTypeChange(this.lastMonitorsType as string);
  }

  getStandardMonitors(): void {
    if (this.standardMonitors && this.standardMonitors.length) {
      this.currentMonitors = this.standardMonitors;
      this.filteredMonitors = this.currentMonitors;
    }
    this.monitorsService.getStandardMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.standardMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );
        this.canToggleStatus = true;
        this.lastMonitorsType = MonitorType.Standard;
        this.updateCurrentMonitors(this.standardMonitors);
        this.userService.lastMonitorsType = 'standard';
      },
      (error: IErrorMessage) => this.handleError(error, `standard`),
    );
  }

  getArchivedMonitors(): void {
    if (this.archivedMonitors && this.archivedMonitors.length) {
      this.currentMonitors = this.archivedMonitors;
      this.filteredMonitors = this.currentMonitors;
    }
    this.monitorsService.getArchivedMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.archivedMonitors = monitors;
        this.canToggleStatus = false;
        this.lastMonitorsType = MonitorStatus.Archived;
        this.updateCurrentMonitors(this.archivedMonitors);
        this.userService.lastMonitorsType = 'archived';
      },
      (error: IErrorMessage) => this.handleError(error, `archived`),
    );
  }

  getSystemMonitors(): void {
    if (this.systemMonitors && this.systemMonitors.length) {
      this.currentMonitors = this.systemMonitors;
      this.filteredMonitors = this.currentMonitors;
    }
    this.monitorsService.getSystemMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.systemMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );
        this.canToggleStatus = true;
        this.lastMonitorsType = MonitorType.System;
        this.updateCurrentMonitors(this.systemMonitors);
        this.userService.lastMonitorsType = 'system';
      },
      (error: IErrorMessage) => this.handleError(error, `system`),
    );
  }

  private updateCurrentMonitors(monitors: IMonitor[]) {
    if (this.overviewTable) {
      this.overviewTable.updateMonitorsStatus();
    }
    this.currentMonitors = monitors;
    this.filteredMonitors = this.currentMonitors;

    this.allCurrentCategories = this.monitorsService.allCurrentCategories(
      this.filteredMonitors,
    );
    this.allCurrentActions = this.monitorsService.allCurrentActions(
      this.filteredMonitors,
    );
  }

  private handleError(error: IErrorMessage, name: string) {
    const { errorCode } = error;
    if (errorCode === errorNoAvailableMonitors) {
      const title = `Error fetching ${name} monitors`;
      const message = `There are no ${name} monitors currently available to view`;
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: { title, message },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.typeToggle.monitorsType = this.lastMonitorsType;
        this.getMonitors();
      });
    }
  }

  refresh() {
    this.getMonitors();
  }

  public onMonitorsTypeChange(monitorsType: string) {
    this.updateMonitorsStatus();
    this.lastMonitorsType =
      (monitorsType as MonitorType) || (monitorsType as MonitorStatus);

    switch (monitorsType) {
      case MonitorType.Standard:
        this.getStandardMonitors();
        break;
      case MonitorStatus.Archived:
        this.getArchivedMonitors();
        this.monitorsStatus = `all`;
        break;
      case MonitorType.System:
        this.getSystemMonitors();
        break;
      default:
        this.getStandardMonitors();
    }
  }

  public get monitorsStatus(): string {
    return this._monitorsStatus;
  }

  public set monitorsStatus(status: string) {
    this._monitorsStatus = status;
    this.filterMonitors();
    if (!this.isCurrentlyArchivedMonitors) {
      this.userService.lastMonitorsStatus = status;
    }
  }

  public toggleStatus(status: string) {
    this.monitorsStatus = status;
    this.filterMonitors();
    if (!this.isCurrentlyArchivedMonitors) {
      this.userService.lastMonitorsStatus = status;
    }
  }

  public updateMonitorsStatus() {
    this.monitorsStatus = this.isCurrentlyArchivedMonitors
      ? 'all'
      : this.userService.lastMonitorsStatus || 'all';
  }

  public filterMonitors(): void {
    // this.dataSource.filter = JSON.stringify(this.filterValues);
    if (this._monitorsStatus === `all`) {
      this.filteredMonitors = this.currentMonitors;
    } else {
      this.filteredMonitors = this.currentMonitors.filter(
        (monitor: IMonitor) => {
          return monitor.status === this.monitorsStatus;
        },
      );
    }
  }
}
