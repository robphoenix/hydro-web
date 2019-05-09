import { Component, OnInit } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { IFilterValues } from '../filter-values';
import { FilterService } from '../filter.service';

@Component({
  selector: 'hydro-view-standard',
  templateUrl: './view-standard.component.html',
  styleUrls: ['./view-standard.component.scss'],
})
export class ViewStandardComponent implements OnInit {
  public filteredMonitors: IMonitor[] = [];
  public searchTerm: string;

  private monitors: IMonitor[] = [];
  private monitorsStatus: string;

  constructor(
    private monitorsService: MonitorsService,
    private userService: UserService,
    private filterService: FilterService,
    public dialog: MatDialog,
    public router: Router,
  ) {}

  ngOnInit() {
    this.status = this.userService.lastMonitorsStatus || `all monitors`;
    this.getMonitors();
  }

  public get status(): string {
    return this.monitorsStatus;
  }

  public set status(status: string) {
    this.monitorsStatus = status;
    this.userService.lastMonitorsStatus = status;
  }

  getMonitors(): void {
    this.monitorsService.getStandardMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.monitors = monitors;
        this.filterMonitors();
      },
      (error: IErrorMessage) => this.handleError(error, `standard`),
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
        this.getMonitors();
      });
    }
  }

  public onToggleStatus(status: string) {
    this.status = status;
    this.filterMonitors();
  }

  private filterMonitors() {
    if (!this.status && !this.searchTerm) {
      this.filteredMonitors = this.monitors;
    } else {
      this.filteredMonitors = this.filterService.filterMonitors(this.monitors, {
        status: this.status,
        searchTerm: this.searchTerm,
      } as IFilterValues);
    }
  }

  public onAddNewMonitor() {
    this.router.navigateByUrl('/monitors/add');
  }
}
