import { Component, OnInit, Input } from '@angular/core';
import { IAction } from 'src/app/actions/action';

@Component({
  selector: 'app-cell-actions',
  templateUrl: './cell-actions.component.html',
  styleUrls: ['./cell-actions.component.scss'],
})
export class CellActionsComponent implements OnInit {
  @Input()
  actions: IAction[];

  actionsIcons: { [action: string]: string } = {
    email: 'mail_outline',
    block: 'block',
    store: 'check',
    other: 'subject',
  };

  // groups: { [group: string]: string } = {};

  ngOnInit(): void {
    // this.actions.forEach((action: IAction) => {
    //   if (this.groups[action.group] === undefined) {
    //     this.groups[action.group] = action.name;
    //   } else {
    //     this.groups[action.group] += `\n${action.name}`;
    //   }
    // });
  }

  // public hasActions(): boolean {
  //   return !!Object.values(this.groups).length;
  // }
}
