import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Input()
  id: number;

  @Output()
  archiveMonitor = new EventEmitter<number>();

  @Output()
  unArchiveMonitor = new EventEmitter<number>();

  @Output()
  enableMonitor = new EventEmitter<number>();

  @Output()
  disableMonitor = new EventEmitter<number>();

  public get isArchived(): boolean {
    return this.status === MonitorStatus.Archived;
  }

  public get isOnline(): boolean {
    return this.status === MonitorStatus.Online;
  }

  public get isOffline(): boolean {
    return this.status === MonitorStatus.Offline;
  }
}
