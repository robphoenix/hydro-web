import { Component, OnInit } from '@angular/core';
import { IMonitor, MonitorStatus } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { MatDialog } from '@angular/material';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Location } from '@angular/common';

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
  useLastStatus = true;
  initialStatus = 'online';
  disableStatusToggle = false;

  constructor(
    private monitorsService: MonitorsService,
    public dialog: MatDialog,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getStandardMonitors();
  }

  getStandardMonitors(): void {
    this.useLastStatus = true;
    this.disableStatusToggle = false;
    if (this.standardMonitors && this.standardMonitors.length) {
      this.currentMonitors = this.standardMonitors;
    }
    this.monitorsService.getStandardMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.standardMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );
        this.updateCurrentMonitors(this.standardMonitors);
      },
      (error: IErrorMessage) => {
        this.handleError(error, `standard`);
      },
    );
  }

  getArchivedMonitors(): void {
    this.useLastStatus = false;
    this.initialStatus = '';
    this.disableStatusToggle = true;
    if (this.archivedMonitors && this.archivedMonitors.length) {
      this.currentMonitors = this.archivedMonitors;
    }
    this.monitorsService.getArchivedMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.archivedMonitors = monitors;
        this.updateCurrentMonitors(this.archivedMonitors);
      },
      (error: IErrorMessage) => {
        this.handleError(error, `archived`);
      },
    );
  }

  getSystemMonitors(): void {
    this.useLastStatus = true;
    this.initialStatus = '';
    this.disableStatusToggle = false;
    if (this.systemMonitors && this.systemMonitors.length) {
      this.currentMonitors = this.systemMonitors;
    }
    this.monitorsService.getSystemMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.systemMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );
        this.updateCurrentMonitors(this.systemMonitors);
      },
      (error: IErrorMessage) => {
        this.handleError(error, `system`);
      },
    );
  }

  private updateCurrentMonitors(monitors: IMonitor[]) {
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
        this.getStandardMonitors();
      });
    }
  }

  refresh() {
    // FIXME: refresh according to current monitors
    this.getStandardMonitors();
  }
}
