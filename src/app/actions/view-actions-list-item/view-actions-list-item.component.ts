import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAction, actionTypeDisplayNames } from '../action';

@Component({
  selector: 'hydro-view-actions-list-item',
  templateUrl: './view-actions-list-item.component.html',
  styleUrls: ['./view-actions-list-item.component.scss'],
})
export class ViewActionsListItemComponent {
  names: { [key: string]: string } = actionTypeDisplayNames;

  @Input()
  action: IAction;

  @Output()
  archiveAction = new EventEmitter<number>();

  onArchiveAction(id: number): void {
    this.archiveAction.emit(id);
  }
}
