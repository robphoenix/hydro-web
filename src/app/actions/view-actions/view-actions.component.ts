import { Component, OnInit } from '@angular/core';
import { IActions } from '../actions';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.scss'],
})
export class ViewActionsComponent implements OnInit {
  public actions: IActions[] = [];
  public filteredActions: IActions[] = [];
  public searchTerm: string;

  constructor(private actionsService: ActionsService) {}

  ngOnInit() {
    this.getActions();
  }

  getActions() {
    this.actionsService.getActions().subscribe((actions: IActions[]) => {
      this.actions = actions.sort((a: IActions, b: IActions) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      });
      this.filteredActions = this.actions;
    });
  }

  filterActions() {
    this.filteredActions = this.actions.filter((action: IActions) => {
      const regex: RegExp = new RegExp(
        this.searchTerm.trim().toLowerCase(),
        'gi',
      );
      const match = `${action.name.toLowerCase()} ${action.description.toLowerCase()}`.match(
        regex,
      );
      return match && match.length > 0;
    });
  }
}
