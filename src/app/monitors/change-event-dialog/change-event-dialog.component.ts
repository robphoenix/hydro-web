import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MonitorStatusChangeDialogComponent } from '../monitor-status-change-dialog/monitor-status-change-dialog.component';

@Component({
  selector: 'hydro-change-event-dialog',
  templateUrl: './change-event-dialog.component.html',
  styleUrls: ['./change-event-dialog.component.scss'],
})
export class ChangeEventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MonitorStatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
