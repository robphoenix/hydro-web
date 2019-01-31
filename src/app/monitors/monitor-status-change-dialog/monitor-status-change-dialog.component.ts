import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-monitor-status-change-dialog',
  templateUrl: './monitor-status-change-dialog.component.html',
  styleUrls: ['./monitor-status-change-dialog.component.scss'],
})
export class MonitorStatusChangeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MonitorStatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  noThanks(): void {
    this.dialogRef.close();
  }
}