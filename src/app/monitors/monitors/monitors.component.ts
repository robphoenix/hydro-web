import { Component } from '@angular/core';
import { MonitorsDataSource } from '../monitors-data-source';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {
  dataSource: MonitorsDataSource = new MonitorsDataSource(this.monitorsService);
  displayedColumns = [
    'name',
    'description',
    'actions',
    'categories',
    'options',
  ];

  constructor(private monitorsService: MonitorsService) {}
}
