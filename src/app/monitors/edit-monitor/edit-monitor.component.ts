import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMonitor } from '../monitor';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MonitorsService } from '../monitors.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private monitorsService: MonitorsService,
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
}
