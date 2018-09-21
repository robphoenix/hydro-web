import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LiveMonitor } from '../monitors/monitor';

@Component({
  selector: 'app-monitor-sidenav',
  templateUrl: './monitor-sidenav.component.html',
  styleUrls: ['./monitor-sidenav.component.scss']
})
export class MonitorSidenavComponent implements OnInit {
  @Input()
  liveMonitors: LiveMonitor[];
  searchTerm: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {}
}
