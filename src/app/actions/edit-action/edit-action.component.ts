import { Component, OnInit, ViewChild } from '@angular/core';
import { IAction } from '../action';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '../actions.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { CreateActionComponent } from '../create-action/create-action.component';

@Component({
  selector: 'hydro-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss'],
})
export class EditActionComponent implements OnInit {
  public action: IAction;

  @ViewChild(CreateActionComponent)
  form: CreateActionComponent;

  constructor(
    private actionsService: ActionsService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.actionsService.getActionById(id).subscribe(
        (action: IAction) => {
          this.action = action;
          console.log({ action });
        },
        (error: any) => console.log({ error }),
      );
    });
  }

  onSubmit(action: IAction) {
    this.actionsService.putAction(action).subscribe(
      () => {
        this.router.navigateByUrl(`/actions/view`);
        this.form.reset();

        this.snackBar.open(`Action ${action.name} edited`, ``, {
          duration: 2000,
        });
      },
      (err: IErrorMessage) => {
        const title = `Error editing action`;
        const { message, cause } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause },
          maxWidth: `800px`,
        });
      },
    );
  }
}
