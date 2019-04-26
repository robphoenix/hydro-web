import { Component, OnInit, Input } from '@angular/core';
import { IAction } from 'src/app/actions/action';

@Component({
  selector: 'hydro-cell-actions',
  templateUrl: './cell-actions.component.html',
  styleUrls: ['./cell-actions.component.scss'],
})
export class CellActionsComponent implements OnInit {
  @Input()
  actions: IAction[];

  actionsIcons: { [action: string]: string } = {
    block: 'block',
  };

  actionTypes: { [actionType: string]: string } = {};

  ngOnInit(): void {
    this.actions.forEach((action: IAction) => {
      if (this.actionTypes[action.actionType] === undefined) {
        this.actionTypes[action.actionType] = action.name;
      } else {
        this.actionTypes[action.actionType] += `\n${action.name}`;
      }
    });
  }

  public hasActions(): boolean {
    return !!Object.values(this.actionTypes).length;
  }
}
