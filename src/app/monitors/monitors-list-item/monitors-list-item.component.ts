import { Component, Input } from '@angular/core';
import { IMonitor, IAction } from '../monitor';

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
}
