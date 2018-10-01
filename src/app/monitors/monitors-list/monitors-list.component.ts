import { IMonitor } from '../monitor';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  search: boolean;
  @Input()
  monitors: IMonitor[];

  searchTerm: string;

  constructor() {}

  ngOnInit() {}
}
