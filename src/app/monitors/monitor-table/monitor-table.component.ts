import { Component, Input } from '@angular/core';

/**
 * Renders the monitor data in a table.
 *
 * @export
 * @class MonitorTableComponent
 */
@Component({
  selector: 'app-monitor-table',
  templateUrl: './monitor-table.component.html',
  styleUrls: ['./monitor-table.component.scss'],
})
export class MonitorTableComponent {
  @Input()
  dataSource: { [key: string]: string }[];
  @Input()
  displayedColumns: string[];
}
