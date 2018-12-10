import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IMonitor, IAction } from '../monitor';
import { MultipleSelectComponent } from 'src/app/shared/multiple-select/multiple-select.component';
import { FormControl, SelectControlValueAccessor } from '@angular/forms';
import { MonitorsService } from '../monitors.service';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss'],
})
export class OverviewTableComponent implements OnInit {
  @Input()
  monitors: IMonitor[];

  filteredMonitors: IMonitor[];

  dataSource: MatTableDataSource<IMonitor>;

  displayedColumns = ['monitor', 'actions', 'categories', 'menu'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  allCurrentActions: IAction[];
  actionGroups: { [group: string]: string[] } = {
    block: [],
    store: [],
    email: [],
    other: [],
  };
  blockControl = new FormControl();
  storeControl = new FormControl();
  emailControl = new FormControl();
  otherControl = new FormControl();
  selectedActions: { [group: string]: string[] } = {
    block: [],
    store: [],
    email: [],
    other: [],
  };

  constructor(private monitorsService: MonitorsService) {}

  ngOnInit(): void {
    this.filteredMonitors = this.monitors;
    this.dataSource = new MatTableDataSource(this.filteredMonitors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (monitor) => monitor.name;
    this.dataSource.sort = this.sort;

    this.allCurrentActions.map((action: IAction) => {
      this.actionGroups[action.group].push(action.name);
    });
  }

  public searchMonitors(searchTerm: string): void {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  filterByActions(): void {
    const selectedActions = Object.values(this.selectedActions).reduce(
      (prev, curr) => [...prev, ...curr],
      [],
    );
    this.dataSource.data = selectedActions.length
      ? this.monitorsService.filterActions(this.monitors, selectedActions)
      : this.monitors;
  }
}
