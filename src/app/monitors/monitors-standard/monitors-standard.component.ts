import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, MonitorStatus } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';
import { UserService } from 'src/app/user/user.service';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-monitors-standard',
  templateUrl: './monitors-standard.component.html',
  styleUrls: ['./monitors-standard.component.scss'],
})
export class MonitorsStandardComponent implements OnInit {
  currentPage = 'standard';
  pageLinks: string[] = ['archived', 'system'];
  standardMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(
    private monitorsService: MonitorsService,
    private userService: UserService,
    public dialog: MatDialog,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.userService.lastMonitorsUrl = `/monitors/${this.currentPage}`;
    this.getMonitors();
  }

  private getMonitors(): void {
    this.monitorsService.getStandardMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.standardMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );

        this.allCurrentCategories = this.monitorsService.allCurrentCategories(
          this.standardMonitors,
        );

        this.allCurrentActions = this.monitorsService.allCurrentActions(
          this.standardMonitors,
        );
      },
      (error: IErrorMessage) => {
        const { errorCode } = error;
        if (errorCode === errorNoAvailableMonitors) {
          const title = 'Error fetching standard monitors';
          const message =
            'There are no standard monitors currently available to view';
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: { title, message },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.location.back();
          });
        }
      },
    );
  }

  refresh() {
    this.getMonitors();
  }
}
