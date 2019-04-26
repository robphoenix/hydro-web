import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MonitorStatus, IMonitor } from '../monitor';
import { Router } from '@angular/router';

@Component({
  selector: 'hydro-cell-monitor',
  templateUrl: './cell-monitor.component.html',
  styleUrls: ['./cell-monitor.component.scss'],
})
export class CellMonitorComponent implements OnInit {
  @Input()
  monitor: IMonitor;

  @Output()
  viewEplQuery = new EventEmitter<number>();

  online: boolean;
  offline: boolean;
  linkTo: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.online = this.monitor.status === MonitorStatus.Online;
    this.offline = this.monitor.status === MonitorStatus.Offline;
    this.linkTo = this.online ? `/monitors/${this.monitor.id}` : null;
  }

  public viewMonitor() {
    this.router.navigateByUrl(`/monitors/${this.monitor.id}`);
  }
}
