import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../actions.service';
import { IActions } from '../actions';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
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
