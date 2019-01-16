import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMonitor } from '../monitor';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorsService } from '../monitors.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-monitor',
  templateUrl: './edit-monitor.component.html',
  styleUrls: ['./edit-monitor.component.scss'],
})
export class EditMonitorComponent implements OnInit, OnDestroy {
  title = 'edit monitor';
  buttonText = 'save monitor';
  monitor: IMonitor;
  sub: Subscription;
  editForm = true;

  constructor(
    private route: ActivatedRoute,
    private monitorsService: MonitorsService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.monitorsService
        .getMonitor(id)
        .subscribe(
          (monitor: IMonitor) => (this.monitor = monitor),
          (error: any) => console.log({ error }),
        );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  saveMonitor(monitor: IMonitor) {
    this.monitorsService.patchMonitor(monitor.id, monitor).subscribe(
      () => {
        this.router.navigate([`/monitors`]);
        this.snackBar.open(`Monitor ${this.monitor.name} edited`, '', {
          duration: 2000,
        });
      },
      (err: string) => {
        console.log({ err });

        const title = 'error editing monitor';
        this.dialog.open(ErrorDialogComponent, {
          data: { title, err },
        });
      },
    );
  }
}
