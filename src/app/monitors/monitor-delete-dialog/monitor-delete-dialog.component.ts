import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDeleteDialogData } from '../delete-dialog-data';

@Component({
  selector: 'app-monitor-delete-dialog',
  templateUrl: './monitor-delete-dialog.component.html',
  styleUrls: ['./monitor-delete-dialog.component.scss'],
})
export class MonitorDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MonitorDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
