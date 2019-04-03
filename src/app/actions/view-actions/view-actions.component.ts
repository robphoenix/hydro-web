import { Component, OnInit } from '@angular/core';
import { IActions } from '../actions';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.scss'],
})
export class ViewActionsComponent implements OnInit {
  actions: IActions[];

  constructor(private actionsService: ActionsService) {}

  getActions() {
    this.actionsService.getActions().subscribe((actions) => {
      console.log({ actions });
      this.actions = actions;
    });
  }

  ngOnInit() {
    this.getActions();
  }
}
