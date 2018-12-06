import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { IMonitor } from '../monitor';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss'],
})
export class OverviewTableComponent implements OnInit {
  @Input()
  monitors: IMonitor[];

  dataSource: MatTableDataSource<IMonitor>;

  displayedColumns = [
    'name',
    'description',
    'actions',
    'categories',
    'options',
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.monitors);
    this.dataSource.paginator = this.paginator;
  }
}
