import { Component, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IMonitor } from '../monitor';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { CreateMonitorFormComponent } from '../create-monitor-form/create-monitor-form.component';
import { IMonitorSubmit } from '../monitor-submit';
import { IErrorMessage } from 'src/app/shared/error-message';

@Component({
  selector: 'app-add-monitor',
  templateUrl: './add-monitor.component.html',
  styleUrls: ['./add-monitor.component.scss'],
})
export class AddMonitorComponent {
  @ViewChild(CreateMonitorFormComponent)
  form: CreateMonitorFormComponent;

  constructor(
    private monitorsService: MonitorsService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  addMonitor(event: IMonitorSubmit) {
    const { monitor, view } = event;
    this.monitorsService.addMonitor(monitor).subscribe(
      (res: IMonitor) => {
        this.form.reset();
        const { id, name } = res;
        const redirectUrl = view ? `/monitors/${id}` : `/monitors`;
        this.router.navigate([redirectUrl]);
        this.snackBar.open(`Monitor ${name} created`, '', {
          duration: 2000,
        });
      },
      (err: IErrorMessage) => {
        const title = 'error adding monitor';
        const { message } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message },
        });
      },
    );
  }
}
