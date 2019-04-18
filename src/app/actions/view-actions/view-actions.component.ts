import { Component, OnInit } from '@angular/core';
import { IAction } from '../action';
import { ActionsService } from '../actions.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MonitorStatusChangeDialogComponent } from 'src/app/monitors/monitor-status-change-dialog/monitor-status-change-dialog.component';
import { MonitorStatus } from 'src/app/monitors/monitor';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { ActionUpdateDialogComponent } from '../action-update-dialog/action-update-dialog.component';

@Component({
  selector: 'app-view-actions',
  templateUrl: './view-actions.component.html',
  styleUrls: ['./view-actions.component.scss'],
})
export class ViewActionsComponent implements OnInit {
  public actions: IAction[] = [];
  public filteredActions: IAction[] = [];
  public searchTerm: string;
  public selectedActionType: string;
  public actionTypeDisplayNames: { [key: string]: string } = {
    block: 'Block',
    emailAlert: 'Email Alert',
    emailRAte: 'Email Rate',
    emailBatch: 'Email Batch',
  };

  constructor(
    private actionsService: ActionsService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

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

  archiveAction(id: number) {
    const actionToArchive = this.actions.find((a: IAction) => a.id === id);
    const action = `Archive`;
    const dialogRef = this.dialog.open(ActionUpdateDialogComponent, {
      data: { actionToArchive, action },
    });

    dialogRef.afterClosed().subscribe((archive: boolean) => {
      if (!archive) {
        return;
      }
      actionToArchive.archived = true;

      this.actionsService.putAction(actionToArchive).subscribe(
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
