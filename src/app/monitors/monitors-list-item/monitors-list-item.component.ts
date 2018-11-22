import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-monitors-list-item',
  templateUrl: './monitors-list-item.component.html',
  styleUrls: ['./monitors-list-item.component.scss'],
})
export class MonitorsListItemComponent {
  @Input()
  monitor: IMonitor;

  @Output()
  deleteMonitor: EventEmitter<IMonitor> = new EventEmitter<IMonitor>();

  icons: { [action: string]: string } = {
    email: 'mail_outline',
    block: 'block',
    save: 'save_alt',
  };

  groupClass: { [group: string]: string } = {
    OTS: 'ots',
    FRM: 'frm',
    Infrastructure: 'infrastructure',
    'Forensic Monitoring': 'fm',
    'Network Security': 'net-sec',
  };

  constructor(public monitorsService: MonitorsService) {}

  /**
   * Open the dialog modal for deleting a monitor.
   *
   * @memberof MonitorsListItemComponent
   */
  openDeleteDialog() {
    this.deleteMonitor.emit(this.monitor);
  }
}
