import { Component, OnInit } from '@angular/core';
import { IMonitor, MonitorStatus, MonitorType } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { MatDialog } from '@angular/material';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { FilterService } from '../filter.service';
import { IFilterValues } from '../filter-values';
import { AuthService } from 'src/app/user/auth.service';
import { RefreshService } from '../refresh.service';

@Component({
  selector: 'hydro-view-monitors',
  templateUrl: './view-monitors.component.html',
  styleUrls: ['./view-monitors.component.scss'],
})
export class ViewMonitorsComponent implements OnInit {
  public filteredMonitors: IMonitor[] = [];
  public searchTerm: string;
  public monitorsType: MonitorType = MonitorType.Standard;
  public allowsEdit: boolean;
  public isAdmin: boolean;

  private monitors: IMonitor[] = [];
  private standardMonitors: IMonitor[] = [];
  private systemMonitors: IMonitor[] = [];
  private monitorsStatus: MonitorStatus;

  constructor(
    private monitorsService: MonitorsService,
    private userService: UserService,
    private filterService: FilterService,
    private authService: AuthService,
    private refreshService: RefreshService,
    public dialog: MatDialog,
    public router: Router,
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    this.allowsEdit = this.authService.allowsEdit;
    this.status = this.userService.lastMonitorsStatus || MonitorStatus.Online;
    this.refreshService.$refreshEvent.subscribe(() => this.onRefresh());
    this.getMonitors();
  }

  public get status(): MonitorStatus {
    return this.monitorsStatus;
  }

  public set status(status: MonitorStatus) {
    this.monitorsStatus = status;
    this.userService.lastMonitorsStatus = status;
  }

  getMonitors(): void {
    switch (this.monitorsType) {
      case MonitorType.Standard:
        this.getStandardMonitors();
        break;
      case MonitorType.System:
        this.getSystemMonitors();
        break;
      default:
        this.getStandardMonitors();
        break;
    }
  }

  private getStandardMonitors() {
    // have we got some monitors to show whilst we're waiting to get the current
    // set of monitors from the server?
    if (this.hasStandardMonitors) {
      this.monitors = this.standardMonitors;
    }
    // update the monitors
    this.monitorsService.getStandardMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.standardMonitors = monitors;
        this.monitors = monitors;
        this.filterMonitors();
      },
      (error: IErrorMessage) => this.handleError(error, MonitorType.Standard),
    );
  }

  private getSystemMonitors() {
    if (!this.isAdmin) {
      return;
    }
    if (this.hasSystemMonitors) {
      this.monitors = this.systemMonitors;
    }
    this.monitorsService.getSystemMonitors().subscribe(
      (monitors: IMonitor[]) => {
        this.systemMonitors = monitors;
        this.monitors = monitors;
        this.filterMonitors();
      },
      (error: IErrorMessage) => this.handleError(error, MonitorType.System),
    );
  }

  private handleError(error: IErrorMessage, name: MonitorType) {
    const { errorCode } = error;
    if (errorCode === errorNoAvailableMonitors) {
      const title = `Error fetching ${name} monitors`;
      const message = `There are no ${name} monitors currently available to view`;
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: { title, message },
      });

      dialogRef.afterClosed().subscribe(() => {
        switch (name) {
          case MonitorType.Standard:
            if (this.hasSystemMonitors) {
              this.monitorsType = MonitorType.System;
              this.getMonitors();
            } else {
              this.onAddNewMonitor();
            }
            break;
          case MonitorType.System:
            if (this.hasStandardMonitors) {
              this.monitorsType = MonitorType.Standard;
              this.getMonitors();
            } else {
              this.onAddNewMonitor();
            }
            break;
          default:
            this.onAddNewMonitor();
            break;
        }
      });
    }
  }

  public onToggleStatus(status: MonitorStatus) {
    this.status = status;
    this.filterMonitors();
  }

  public filterMonitors() {
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

  public onSelectionChange() {
    this.getMonitors();
  }

  private get hasStandardMonitors(): boolean {
    return !!(this.standardMonitors && this.standardMonitors.length);
  }

  private get hasSystemMonitors(): boolean {
    return !!(this.systemMonitors && this.systemMonitors.length);
  }

  public onRefresh() {
    this.getMonitors();
  }
}
