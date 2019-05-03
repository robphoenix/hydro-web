import { Component, OnInit } from '@angular/core';
import { IAction } from '../action';
import { ActivatedRoute } from '@angular/router';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'hydro-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss'],
})
export class EditActionComponent implements OnInit {
  public action: IAction;

  constructor(
    private actionsService: ActionsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.actionsService.getActionById(id).subscribe(
        (action: IAction) => {
          this.action = action;
        },
        (error: any) => console.log({ error }),
      );
    });
  }

  onSubmit(event: any) {
    console.log({ event });
  }
}
