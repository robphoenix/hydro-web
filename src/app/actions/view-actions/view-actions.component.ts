import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IActions } from '../actions';
import { ActionsService } from '../actions.service';
import {
  MatTableDataSource,
  MatSort,
  Sort,
  MatSortable,
} from '@angular/material';

@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.scss'],
})
export class ViewActionsComponent implements OnInit {
  public actions: IActions[] = [];

  public dataSource: MatTableDataSource<IActions>;
  public displayedColumns = ['name', 'group', 'metadata'];

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private actionsService: ActionsService) {}

  getActions() {
    this.actionsService.getActions().subscribe((actions: IActions[]) => {
      this.actions = actions.sort((a: IActions, b: IActions) =>
        this.compare(a.name.toLowerCase(), b.name.toLowerCase(), true),
      );
      this.dataSource = new MatTableDataSource(this.actions);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.getActions();
  }

  sortData(sort: Sort) {
    const data = this.actions.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(
            a.name.toLowerCase(),
            b.name.toLowerCase(),
            isAsc,
          );
        case 'group':
          return this.compare(a.group, b.group, isAsc);

        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
