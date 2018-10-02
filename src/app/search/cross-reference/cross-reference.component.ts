import { ICrossReference } from './../search-data';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cross-reference',
  templateUrl: './cross-reference.component.html',
  styleUrls: ['./cross-reference.component.scss']
})
export class CrossReferenceComponent implements OnInit {
  @Input()
  crossReference: MatTableDataSource<ICrossReference>;

  columns: string[] = [
    'username',
    'ip',
    'stk',
    'userAgent',
    'timeStamp',
    'loginStatus'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.crossReference.paginator = this.paginator;
    this.crossReference.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.crossReference.filter = filterValue.trim().toLowerCase();

    if (this.crossReference.paginator) {
      this.crossReference.paginator.firstPage();
    }
  }
}
