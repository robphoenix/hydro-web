import { Component, ViewChild } from '@angular/core';
import { ActionsService } from '../actions.service';
import { IAction } from '../action';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CreateActionComponent } from '../create-action/create-action.component';
import { TitleService } from 'src/app/shared/title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'hydro-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss'],
})
export class AddActionComponent {
  @ViewChild(CreateActionComponent)
  form: CreateActionComponent;

  constructor(
    private actionsService: ActionsService,
    public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    titleService: TitleService,
    title: Title,
  ) {
    title.setTitle(titleService.title(`Add Action`));
  }

  onSubmit(action: IAction) {
    this.actionsService.addAction(action).subscribe(
      () => {
        this.router.navigateByUrl(`/actions/view`);
        this.form.reset();
        this.snackBar.open(`Action ${action.name} created`, '', {
          duration: 2000,
        });
      },
      (err: IErrorMessage) => {
        const title = `error adding action`;
        const { message, cause } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause },
          maxWidth: `800px`,
        });
      },
    );
  }
}
