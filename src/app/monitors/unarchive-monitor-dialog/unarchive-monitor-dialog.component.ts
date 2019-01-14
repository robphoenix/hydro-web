import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-unarchive-monitor-dialog',
  templateUrl: './unarchive-monitor-dialog.component.html',
  styleUrls: ['./unarchive-monitor-dialog.component.scss'],
})
export class UnarchiveMonitorDialogComponent {
  status = 'offline';

  constructor(
    public dialogRef: MatDialogRef<UnarchiveMonitorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
