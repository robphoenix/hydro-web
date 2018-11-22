import { Component, Input } from '@angular/core';
import { IMonitor, IAction } from '../monitor';
import { MatDialog } from '@angular/material';
import { MonitorDeleteDialogComponent } from '../monitor-delete-dialog/monitor-delete-dialog.component';
import { IDeleteDialogData } from '../delete-dialog-data';

@Component({
  selector: 'app-monitors-list-item',
  templateUrl: './monitors-list-item.component.html',
  styleUrls: ['./monitors-list-item.component.scss'],
})
export class MonitorsListItemComponent {
  @Input()
  monitor: IMonitor;

  icons = {
    email: 'mail_outline',
    block: 'block',
    save: 'save_alt',
  };

  groupClass = {
    OTS: 'ots',
    FRM: 'frm',
    Infrastructure: 'infrastructure',
    'Forensic Monitoring': 'fm',
    'Network Security': 'net-sec',
  };

  constructor(public dialog: MatDialog) {}

  /**
   * Returns a single string that contains the list of actions.
   *
   * @param {IAction[]} actions
   * @returns {string}
   * @memberof MonitorsListItemComponent
   */
  actionNames(actions: IAction[]): string {
    return actions.map((action) => action.name).join('\n');
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(MonitorDeleteDialogComponent, {
      data: { topic: this.monitor.topic } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log({ result });
    });
  }
}
