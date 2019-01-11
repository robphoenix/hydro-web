import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IMonitor } from '../monitor';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorsService } from '../monitors.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { CreateMonitorFormComponent } from '../create-monitor-form/create-monitor-form.component';

@Component({
  selector: 'app-duplicate-monitor',
  templateUrl: './duplicate-monitor.component.html',
  styleUrls: ['./duplicate-monitor.component.scss'],
})
export class DuplicateMonitorComponent implements OnInit, OnDestroy {
  title = 'duplicate monitor';
  buttonText = 'save monitor';
  monitor: IMonitor;
  monitorName: string;
  sub: Subscription;

  @ViewChild(CreateMonitorFormComponent)
  form: CreateMonitorFormComponent;

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
      this.monitorsService.getMonitor(id).subscribe(
        (monitor: IMonitor) => {
          this.monitorName = `DUPLICATE ${monitor.name}`;
          this.monitor = monitor;
        },
        (error: any) => console.log({ error }),
      );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addMonitor(monitor: IMonitor) {
    this.monitorsService.addMonitor(monitor).subscribe(
      (res: IMonitor) => {
        this.form.reset();
        const { id, name } = res;
        this.router.navigate([`/monitors/${id}`]);
        this.snackBar.open(`Monitor ${name} created`, '', {
          duration: 2000,
        });
      },
      (err: string) => {
        const title = 'error adding monitor';
        this.dialog.open(ErrorDialogComponent, {
          data: { title, err },
        });
      },
    );
  }
}
