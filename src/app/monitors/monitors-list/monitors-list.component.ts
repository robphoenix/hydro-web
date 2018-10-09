import { IMonitor } from '../monitor';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Displays the list of monitors.
 *
 * @export
 * @class MonitorsListComponent
 */
@Component({
  selector: 'app-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent {
  @Input()
  title: string;
  @Input()
  search: boolean;
  @Input()
  monitors: IMonitor[];

  searchTerm: string;

  constructor() {}
}
