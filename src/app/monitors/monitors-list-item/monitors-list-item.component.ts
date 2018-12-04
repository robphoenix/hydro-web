import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IMonitor, IAction } from '../monitor';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-monitors-list-item',
  templateUrl: './monitors-list-item.component.html',
  styleUrls: ['./monitors-list-item.component.scss'],
})
export class MonitorsListItemComponent implements OnInit {
  @Input()
  monitor: IMonitor;

  @Output()
  deleteMonitor: EventEmitter<IMonitor> = new EventEmitter<IMonitor>();

  actions: { [group: string]: string } = {};

  icons: { [action: string]: string } = {
    email: 'mail_outline',
    block: 'block',
    store: 'check',
    other: 'subject',
  };

  groupClass: { [group: string]: string } = {
    OTS: 'ots',
    FRM: 'frm',
    Infrastructure: 'infrastructure',
    'Forensic Monitoring': 'fm',
    'Network Security': 'net-sec',
  };

  constructor(public monitorsService: MonitorsService) {}

  ngOnInit(): void {
    this.monitor.actions.forEach((action: IAction) => {
      if (this.actions[action.group] === undefined) {
        this.actions[action.group] = action.name;
      } else {
        this.actions[action.group] += `\n${action.name}`;
      }
    });
  }

  /**
   * Open the dialog modal for deleting a monitor.
   *
   * @memberof MonitorsListItemComponent
   */
  openDeleteDialog() {
    this.deleteMonitor.emit(this.monitor);
  }
}
