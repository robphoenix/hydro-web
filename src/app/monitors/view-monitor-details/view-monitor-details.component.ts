import { Component, Input } from '@angular/core';
import { IMonitor } from '../monitor';

@Component({
  selector: 'hydro-view-monitor-details',
  templateUrl: './view-monitor-details.component.html',
  styleUrls: ['./view-monitor-details.component.scss'],
})
export class ViewMonitorDetailsComponent {
  @Input()
  monitor: IMonitor;
}
