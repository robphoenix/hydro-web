import { Component, OnInit } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import {
  IErrorMessage,
  errorNoAvailableMonitors,
} from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'hydro-view-standard',
  templateUrl: './view-standard.component.html',
  styleUrls: ['./view-standard.component.scss'],
})
export class ViewStandardComponent implements OnInit {
  private _currentMonitors: IMonitor[] = [];
  private _filteredMonitors: IMonitor[] = [];

  constructor(
    private monitorsService: MonitorsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getMonitors();
  }

  public get monitors(): IMonitor[] {
    return this._filteredMonitors;
  }

  public set monitors(monitors: IMonitor[]) {
    this._currentMonitors = monitors;
    this._filteredMonitors = monitors;
  }

  getMonitors(): void {
    this.monitorsService
      .getStandardMonitors()
      .subscribe(
        (monitors: IMonitor[]) => (this.monitors = monitors),
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
}
