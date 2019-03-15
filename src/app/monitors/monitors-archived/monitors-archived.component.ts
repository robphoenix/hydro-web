import { Component, OnInit } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { UserService } from 'src/app/user/user.service';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monitors-archived',
  templateUrl: './monitors-archived.component.html',
  styleUrls: ['./monitors-archived.component.scss'],
})
export class MonitorsArchivedComponent implements OnInit {
  currentPage = 'archived';
  pageLinks: string[] = ['system', 'standard'];
  archivedMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];

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
    this.monitorsService.getArchivedMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.archivedMonitors = monitors;

        this.allCurrentCategories = this.monitorsService.allCurrentCategories(
          this.archivedMonitors,
        );

        this.allCurrentActions = this.monitorsService.allCurrentActions(
          this.archivedMonitors,
        );
      },
      (error: IErrorMessage) => {
        const { errorCode } = error;
        if (errorCode === errorNoAvailableMonitors) {
          const title = 'Error fetching archived monitors';
          const message =
            'There are no archived monitors currently available to view';
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
