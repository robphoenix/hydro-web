import { Component, Input } from '@angular/core';
import { MonitorStatus } from '../monitor';

@Component({
  selector: 'app-cell-menu',
  templateUrl: './cell-menu.component.html',
  styleUrls: ['./cell-menu.component.scss'],
})
export class CellMenuComponent {
  showDelay = 500;

  @Input()
  status: MonitorStatus;

  public get isArchived(): boolean {
    return this.status === MonitorStatus.Archived;
  }
}
