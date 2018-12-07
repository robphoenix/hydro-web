import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
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

  displayedColumns = ['monitor', 'actions', 'categories', 'menu'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.monitors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (monitor) => {
      return monitor.name;
    };
    this.dataSource.sort = this.sort;
  }

  public searchMonitors(searchTerm: string): void {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }
}
