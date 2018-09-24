import { Component, Input } from '@angular/core';
import { LiveMonitor } from '../monitors/monitor';

@Component({
  selector: 'app-monitor-sidenav',
  templateUrl: './monitor-sidenav.component.html',
  styleUrls: ['./monitor-sidenav.component.scss']
})
export class MonitorSidenavComponent {
  @Input()
  liveMonitors: LiveMonitor[];
  @Input()
  favouriteMonitors: LiveMonitor[];
  searchTerm: string;
}
