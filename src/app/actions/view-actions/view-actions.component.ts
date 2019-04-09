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
  public group = 'all';
  public icons: { [type: string]: { icon: string; colour: string } } = {
    actions: {
      icon: 'play_circle_filled',
      colour: 'orange',
    },
    block: { icon: 'block', colour: 'red' },
    email: { icon: 'mail_outline', colour: 'green' },
    store: { icon: 'check', colour: 'blue' },
    other: { icon: 'subject', colour: 'yellow' },
  };

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

  filterActions(group?: string) {
    this.group = group || this.group;
    console.log(this.searchTerm);
    console.log(this.group);
    this.filteredActions = this.actions.filter((action: IActions) => {
      const searchTerm: string = this.searchTerm || '';

      const regex: RegExp = new RegExp(searchTerm.trim().toLowerCase(), 'gi');
      const match = `${action.name.toLowerCase()} ${action.description.toLowerCase()}`.match(
        regex,
      );
      const matchesSearchTerm: boolean = match && match.length > 0;
      const isInGroup: boolean =
        this.group === 'all' ? true : action.group === this.group;

      return matchesSearchTerm && isInGroup;
    });
  }
}
