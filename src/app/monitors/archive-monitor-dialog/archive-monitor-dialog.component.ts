import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-archive-monitor-dialog',
  templateUrl: './archive-monitor-dialog.component.html',
  styleUrls: ['./archive-monitor-dialog.component.scss'],
})
export class ArchiveMonitorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ArchiveMonitorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  noThanks(): void {
    this.dialogRef.close();
  }
}
