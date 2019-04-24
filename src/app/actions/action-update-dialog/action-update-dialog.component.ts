import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-action-update-dialog',
  templateUrl: './action-update-dialog.component.html',
  styleUrls: ['./action-update-dialog.component.scss'],
})
export class ActionUpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ActionUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
