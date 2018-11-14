import { Component, OnInit, Input } from '@angular/core';
import { IMonitor, IAction } from '../monitor';

@Component({
  selector: 'app-monitors-card',
  templateUrl: './monitors-card.component.html',
  styleUrls: ['./monitors-card.component.scss'],
})
export class MonitorsCardComponent implements OnInit {
  @Input()
  monitor: IMonitor;

  icons = {
    email: 'email',
    block: 'block',
    save: 'save_alt',
  };

  actionNames(actions: IAction[]): string {
    return actions.map((action) => action.name).join(', ');
  }

  constructor() {}

  ngOnInit() {}
}
