import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-monitor-table',
  templateUrl: './monitor-table.component.html',
  styleUrls: ['./monitor-table.component.scss'],
})
export class MonitorTableComponent {
  @Input() dataSource: { [key: string]: string }[];
  @Input() displayedColumns: string[];
}
