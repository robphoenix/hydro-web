import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IAction, actionTypeDisplayNames } from '../action';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'hydro-view-actions-list-item',
  templateUrl: './view-actions-list-item.component.html',
  styleUrls: ['./view-actions-list-item.component.scss'],
})
export class ViewActionsListItemComponent implements OnInit {
  public isAdmin: boolean;
  public names: { [key: string]: string } = actionTypeDisplayNames;

  @Input()
  action: IAction;

  @Output()
  archiveAction = new EventEmitter<number>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
  }

  onArchiveAction(id: number): void {
    this.archiveAction.emit(id);
  }
}
