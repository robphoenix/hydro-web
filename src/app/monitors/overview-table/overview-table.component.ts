import { Component, OnInit, Input } from '@angular/core';
import { MonitorsDataSource } from '../monitors-data-source';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss'],
})
export class OverviewTableComponent {
  @Input()
  dataSource: MonitorsDataSource;

  @Input()
  displayedColumns: string[];
}
