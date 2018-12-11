import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../monitor';

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
  status: Status;

  online: boolean;

  ngOnInit(): void {
    this.online = this.status === Status.Online;
  }
}
