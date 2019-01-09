import { Component } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IMonitor } from '../monitor';
import { CreateMonitorErrorDialogComponent } from '../create-monitor-error-dialog/create-monitor-error-dialog.component';

@Component({
  selector: 'app-add-monitor',
  templateUrl: './add-monitor.component.html',
  styleUrls: ['./add-monitor.component.scss'],
})
export class AddMonitorComponent {
  title = 'add monitor';

  constructor(
    private monitorsService: MonitorsService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  addMonitor(monitor: IMonitor) {
    this.monitorsService.addMonitor(monitor).subscribe(
      (res: IMonitor) => {
        const { id } = res;
        this.router.navigate([`/monitors/${id}`]);
        this.snackBar.open(`Monitor ${name} created.`, '', {
          duration: 2000,
        });
      },
      (err: string) => {
        this.dialog.open(CreateMonitorErrorDialogComponent, {
          data: { err },
        });
      },
    );
  }
}
