import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, MonitorStatus, MonitorType } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { MatDialog } from '@angular/material';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  currentMonitors: IMonitor[] = [];
  standardMonitors: IMonitor[] = [];
  archivedMonitors: IMonitor[] = [];
  systemMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];
  canToggleStatus = true;
  lastMonitorsType: MonitorType | MonitorStatus = MonitorType.Standard;

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(
    private monitorsService: MonitorsService,
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const lastViewed: string = this.userService.lastMonitorsType;
    if (lastViewed) {
      this.lastMonitorsType =
        (lastViewed as MonitorType) || (lastViewed as MonitorStatus);
    }
    this.getMonitors();
  }

  private getMonitors() {
    switch (this.lastMonitorsType) {
      case MonitorType.Standard:
        this.getStandardMonitors();
        break;
      case MonitorStatus.Archived:
        this.getArchivedMonitors();
        break;
      case MonitorType.System:
        this.getSystemMonitors();
        break;
      default:
        this.getStandardMonitors();
    }
  }

  getStandardMonitors(): void {
    if (this.standardMonitors && this.standardMonitors.length) {
      this.currentMonitors = this.standardMonitors;
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
      (error: IErrorMessage) => {
        this.handleError(error, `standard`);
      },
    );
  }

  getArchivedMonitors(): void {
    if (this.archivedMonitors && this.archivedMonitors.length) {
      this.currentMonitors = this.archivedMonitors;
    }
    this.monitorsService.getArchivedMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.archivedMonitors = monitors;
        this.canToggleStatus = false;
        this.lastMonitorsType = MonitorStatus.Archived;
        this.updateCurrentMonitors(this.archivedMonitors);
        this.userService.lastMonitorsType = 'archived';
      },
      (error: IErrorMessage) => {
        this.handleError(error, `archived`);
      },
    );
  }

  getSystemMonitors(): void {
    if (this.systemMonitors && this.systemMonitors.length) {
      this.currentMonitors = this.systemMonitors;
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
      (error: IErrorMessage) => {
        this.handleError(error, `system`);
      },
    );
  }

  private updateCurrentMonitors(monitors: IMonitor[]) {
    if (this.overviewTable) {
      this.overviewTable.updateMonitorsStatus();
    }
    this.currentMonitors = monitors;

    this.allCurrentCategories = this.monitorsService.allCurrentCategories(
      this.currentMonitors,
    );
    this.allCurrentActions = this.monitorsService.allCurrentActions(
      this.currentMonitors,
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
        this.overviewTable.monitorsType = this.lastMonitorsType;
        this.getMonitors();
      });
    }
  }

  refresh() {
    this.getMonitors();
  }

  public changeMonitorsType(monitorsType: string) {
    switch (monitorsType) {
      case MonitorType.Standard:
        this.getStandardMonitors();
        break;
      case MonitorStatus.Archived:
        this.getArchivedMonitors();
        break;
      case MonitorType.System:
        this.getSystemMonitors();
        break;
      default:
        this.getStandardMonitors();
    }
  }
}
