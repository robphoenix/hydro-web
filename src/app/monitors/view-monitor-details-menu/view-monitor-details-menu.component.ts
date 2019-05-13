<<<<<<< HEAD:src/app/monitors/view-monitor-details-menu/view-monitor-details-menu.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MonitorStatus, IMonitor } from '../monitor';
=======
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { IMonitor, MonitorStatus } from '../monitor';
>>>>>>> Add refresh service & update permissions:src/app/monitors/view-monitors-list-item-menu/view-monitors-list-item-menu.component.ts
import { AuthService } from 'src/app/user/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MonitorStatusChangeDialogComponent } from '../monitor-status-change-dialog/monitor-status-change-dialog.component';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
<<<<<<< HEAD:src/app/monitors/view-monitor-details-menu/view-monitor-details-menu.component.ts
import { MonitorsService } from '../monitors.service';
=======
import { RefreshService } from '../refresh.service';
>>>>>>> Add refresh service & update permissions:src/app/monitors/view-monitors-list-item-menu/view-monitors-list-item-menu.component.ts

@Component({
  selector: 'hydro-view-monitor-details-menu',
  templateUrl: './view-monitor-details-menu.component.html',
  styleUrls: ['./view-monitor-details-menu.component.scss'],
})
<<<<<<< HEAD:src/app/monitors/view-monitor-details-menu/view-monitor-details-menu.component.ts
export class ViewMonitorDetailsMenuComponent implements OnInit {
=======
export class ViewMonitorsListItemMenuComponent implements OnInit, OnDestroy {
>>>>>>> Add refresh service & update permissions:src/app/monitors/view-monitors-list-item-menu/view-monitors-list-item-menu.component.ts
  public allowsEdit: boolean;
  public allowsEnable: boolean;
  public showDelay = 500;

  @Input()
  monitor: IMonitor;

  constructor(
    private authService: AuthService,
    private monitorsService: MonitorsService,
    private refreshService: RefreshService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.allowsEdit = this.authService.allowsEdit;
    this.allowsEnable = this.authService.allowsEnable;
  }

  ngOnDestroy(): void {
    this.refreshService.resetRefreshEvent();
  }

  public get isArchived(): boolean {
    return this.monitor.status === MonitorStatus.Archived;
  }

  public get isOnline(): boolean {
    return this.monitor.status === MonitorStatus.Online;
  }

  public get isOffline(): boolean {
    return this.monitor.status === MonitorStatus.Offline;
  }

  public archiveMonitor() {
    const monitor: IMonitor = this.monitor;
    const action = `Archive`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((archive: boolean) => {
      if (!archive) {
        return;
      }
      monitor.status = MonitorStatus.Archived;

      this.monitorsService.putMonitor(monitor).subscribe(
        () => {
          this.refreshService.refresh();
          this.snackBar.open(`Monitor ${monitor.name} archived`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public unArchiveMonitor() {
    const monitor: IMonitor = this.monitor;
    const action = `unarchive`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((unarchive: boolean) => {
      if (!unarchive) {
        return;
      }

      monitor.status = MonitorStatus.Offline;

      this.monitorsService.putMonitor(monitor).subscribe(
        () => {
          this.refreshService.refresh();
          this.snackBar.open(`Monitor ${monitor.name} unarchived`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'unarchive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public enableMonitor(id: number) {
    const monitor: IMonitor = this.monitor;
    const action = `Enable`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((enable: boolean) => {
      if (!enable) {
        return;
      }
      monitor.status = MonitorStatus.Online;
      this.monitorsService.putMonitor(monitor).subscribe(
        () => {
          this.refreshService.refresh();
          this.snackBar.open(`Monitor ${monitor.name} enabled`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public disableMonitor() {
    const monitor: IMonitor = this.monitor;
    const action = `Disable`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((disable: boolean) => {
      if (!disable) {
        return;
      }
      monitor.status = MonitorStatus.Offline;
      this.monitorsService.putMonitor(monitor).subscribe(
        () => {
          this.refreshService.refresh();
          this.snackBar.open(`Monitor ${monitor.name} disabled`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }
}
