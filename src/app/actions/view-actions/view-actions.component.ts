import { Component, OnInit } from '@angular/core';
import { IAction } from '../action';
import { ActionsService } from '../actions.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { ActionUpdateDialogComponent } from '../action-update-dialog/action-update-dialog.component';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'hydro-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.scss'],
})
export class ViewActionsComponent implements OnInit {
  public actions: IAction[] = [];
  public filteredActions: IAction[] = [];
  public searchTerm: string;
  public selectedActionType: string;
  public allowsEdit: boolean;

  constructor(
    private actionsService: ActionsService,
    private authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.allowsEdit = this.authService.allowsEdit;
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
    this.filteredActions = this.actions.filter((action: IAction) => {
      const searchTerm: string = this.searchTerm || '';

      const regex: RegExp = new RegExp(searchTerm.trim().toLowerCase(), 'gi');
      const match = `${action.name.toLowerCase()} ${action.description.toLowerCase()}`.match(
        regex,
      );
      const matchesSearchTerm: boolean = match && match.length > 0;
      const isActionType: boolean = this.selectedActionType
        ? this.selectedActionType === action.actionType
        : true;

      return matchesSearchTerm && isActionType;
    });
  }

  onArchiveAction(id: number) {
    const actionToArchive = this.actions.find((a: IAction) => a.id === id);
    const action = `Archive`;
    const dialogRef = this.dialog.open(ActionUpdateDialogComponent, {
      data: { actionToArchive, action },
    });

    dialogRef.afterClosed().subscribe((archive: boolean) => {
      if (!archive) {
        return;
      }

      this.actionsService.archiveAction(actionToArchive).subscribe(
        () => {
          this.refresh();
          this.snackBar.open(`Action ${actionToArchive.name} archived`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive action error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  refresh() {
    this.getActions();
  }
}
