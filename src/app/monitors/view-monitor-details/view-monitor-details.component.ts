import { Component, Input } from '@angular/core';
import { IMonitor } from '../monitor';
import { Router } from '@angular/router';

@Component({
  selector: 'hydro-view-monitor-details',
  templateUrl: './view-monitor-details.component.html',
  styleUrls: ['./view-monitor-details.component.scss'],
})
export class ViewMonitorDetailsComponent {
  @Input()
  monitor: IMonitor;

  constructor(private router: Router) {}

  public viewMonitor() {
    this.router.navigateByUrl(`/monitors/${this.monitor.id}`);
  }
}
