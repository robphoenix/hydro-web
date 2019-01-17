import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ArchiveMonitorDialogComponent } from '../archive-monitor-dialog/archive-monitor-dialog.component';

@Component({
  selector: 'app-epl-query-dialog',
  templateUrl: './epl-query-dialog.component.html',
  styleUrls: ['./epl-query-dialog.component.scss'],
})
export class EplQueryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ArchiveMonitorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
