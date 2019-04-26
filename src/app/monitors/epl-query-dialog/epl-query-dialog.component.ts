import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'hydro-epl-query-dialog',
  templateUrl: './epl-query-dialog.component.html',
  styleUrls: ['./epl-query-dialog.component.scss'],
})
export class EplQueryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EplQueryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
