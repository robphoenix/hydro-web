import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAction, actionTypeDisplayNames } from '../action';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'hydro-view-actions-list-item',
  templateUrl: './view-actions-list-item.component.html',
  styleUrls: ['./view-actions-list-item.component.scss'],
})
export class ViewActionsListItemComponent {
  public names: { [key: string]: string } = actionTypeDisplayNames;
  public showProperties = false;

  @Input()
  action: IAction;

  @Output()
  archiveAction = new EventEmitter<number>();

  constructor(private authService: AuthService) {}

  public get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  onArchiveAction(id: number): void {
    this.archiveAction.emit(id);
  }
}
