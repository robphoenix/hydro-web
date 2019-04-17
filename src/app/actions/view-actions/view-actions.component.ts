import { Component, OnInit } from '@angular/core';
import { IAction } from '../action';
import { ActionsService } from '../actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.scss'],
})
export class ViewActionsComponent implements OnInit {
  public actions: IAction[] = [];
  public filteredActions: IAction[] = [];
  public searchTerm: string;
  // public type = 'all';
  // public icons: { [type: string]: { icon: string; colour: string } } = {
  //   actions: {
  //     icon: 'play_circle_filled',
  //     colour: 'orange',
  //   },
  //   block: { icon: 'block', colour: 'red' },
  //   email: { icon: 'mail_outline', colour: 'green' },
  //   store: { icon: 'check', colour: 'blue' },
  //   other: { icon: 'subject', colour: 'yellow' },
  // };

  constructor(private actionsService: ActionsService, public router: Router) {}

  ngOnInit() {
    this.getActions();
  }

  getActions() {
    this.actionsService.getActions().subscribe((actions: IAction[]) => {
      this.actions = actions.sort((a: IAction, b: IAction) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      });
      this.filteredActions = this.actions;
    });
  }

  filterActions() {
    // this.type = type || this.type;
    this.filteredActions = this.actions.filter((action: IAction) => {
      const searchTerm: string = this.searchTerm || '';

      const regex: RegExp = new RegExp(searchTerm.trim().toLowerCase(), 'gi');
      const match = `${action.name.toLowerCase()} ${action.description.toLowerCase()}`.match(
        regex,
      );
      const matchesSearchTerm: boolean = match && match.length > 0;
      // const isInGroup: boolean =
      //   this.type === 'all' ? true : action.group === this.type;

      return matchesSearchTerm;
    });
  }
}
