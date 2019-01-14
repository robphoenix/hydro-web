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

  public archive(id: number) {
    this.archiveMonitor.emit(id);
  }

  public unArchive(id: number) {
    this.unArchiveMonitor.emit(id);
  }

  public get isArchived(): boolean {
    return this.status === MonitorStatus.Archived;
  }
}
