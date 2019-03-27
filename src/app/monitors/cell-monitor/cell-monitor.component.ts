import { Component, Input, OnInit } from '@angular/core';
import { MonitorStatus } from '../monitor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cell-monitor',
  templateUrl: './cell-monitor.component.html',
  styleUrls: ['./cell-monitor.component.scss'],
})
export class CellMonitorComponent implements OnInit {
  @Input()
  id: number;

  @Input()
  name: string;

  @Input()
  description: string;

  @Input()
  status: MonitorStatus;

  online: boolean;
  offline: boolean;
  linkTo: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.online = this.status === MonitorStatus.Online;
    this.offline = this.status === MonitorStatus.Offline;
    this.linkTo = this.online ? `/monitors/${this.id}` : null;
  }

  public viewMonitor() {
    this.router.navigateByUrl(`/monitors/${this.id}`);
  }
}
