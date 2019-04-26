import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hydro-monitor-status-change-dialog',
  templateUrl: './monitor-status-change-dialog.component.html',
  styleUrls: ['./monitor-status-change-dialog.component.scss'],
})
export class MonitorStatusChangeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MonitorStatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
