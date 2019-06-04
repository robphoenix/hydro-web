import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IMonitor } from '../monitor';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorsService } from '../monitors.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { IMonitorSubmit } from '../monitor-submit';
import { IErrorMessage } from 'src/app/shared/error-message';
import { CreateMonitorFormComponent } from '../create-monitor-form/create-monitor-form.component';
import { TitleService } from 'src/app/shared/title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'hydro-edit-monitor',
  templateUrl: './edit-monitor.component.html',
  styleUrls: ['./edit-monitor.component.scss'],
})
export class EditMonitorComponent implements OnInit, OnDestroy {
  monitor: IMonitor;
  sub: Subscription;

  @ViewChild(CreateMonitorFormComponent)
  form: CreateMonitorFormComponent;

  constructor(
    private route: ActivatedRoute,
    private monitorsService: MonitorsService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    titleService: TitleService,
    title: Title,
  ) {
    title.setTitle(titleService.title(`Edit Monitor`));
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.monitorsService.getMonitorById(id).subscribe(
        (monitor: IMonitor) => {
          this.monitor = monitor;
        },
        (error: any) => console.log({ error }),
      );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  saveMonitor(event: IMonitorSubmit) {
    const { monitor, view } = event;
    this.monitorsService.putMonitor(monitor).subscribe(
      (res) => {
        console.log({ res });

        console.log({ view });

        view
          ? this.router.navigateByUrl(`/monitors/${monitor.id}`)
          : this.router.navigateByUrl(`/monitors/view`);

        this.form.reset();
        this.snackBar.open(`Monitor ${monitor.name} edited`, ``, {
          duration: 2000,
        });
      },
      (err: IErrorMessage) => {
        const title = `Error editing monitor`;
        const { message, cause } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause },
          maxWidth: `800px`,
        });
      },
    );
  }
}
