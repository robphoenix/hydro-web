import { BlockHistory } from './../../../search-data';
import { ParameterType } from './../../../../shared/parameterType';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BlockHistory } from '../../../search-data';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-block-history',
  templateUrl: './block-history.component.html',
  styleUrls: ['./block-history.component.scss']
})
export class BlockHistoryComponent implements OnInit {
  @Input()
  blockHistory: MatTableDataSource<BlockHistory>;

  @Input()
  parameterType: ParameterType;

  columns: string[] = [
    'date',
    'duration',
    'parameterType',
    'topic',
    'username',
    'action',
    'description'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.blockHistory.paginator = this.paginator;

    this.blockHistory.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date':
          return item.createdDate;
        default:
          return item[property];
      }
    };
    this.blockHistory.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.blockHistory.filter = filterValue.trim().toLowerCase();

    if (this.blockHistory.paginator) {
      this.blockHistory.paginator.firstPage();
    }
  }
}
