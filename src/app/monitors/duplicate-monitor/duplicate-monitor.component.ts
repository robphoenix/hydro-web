import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IMonitor } from '../monitor';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorsService } from '../monitors.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { CreateMonitorFormComponent } from '../create-monitor-form/create-monitor-form.component';
import { IMonitorSubmit } from '../monitor-submit';
import { IErrorMessage } from 'src/app/shared/error-message';
import { TitleService } from 'src/app/shared/title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'hydro-duplicate-monitor',
  templateUrl: './duplicate-monitor.component.html',
  styleUrls: ['./duplicate-monitor.component.scss'],
})
export class DuplicateMonitorComponent implements OnInit, OnDestroy {
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
    titleService: TitleService,
    title: Title,
  ) {
    title.setTitle(titleService.title(`Duplicate Monitor`));
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.monitorsService.getMonitorById(id).subscribe(
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
        const { message, cause } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause },
          maxWidth: `800px`,
        });
      },
    );
  }
}
