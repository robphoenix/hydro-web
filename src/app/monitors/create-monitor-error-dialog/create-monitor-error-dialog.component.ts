import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-monitor-error-dialog',
  templateUrl: './create-monitor-error-dialog.component.html',
  styleUrls: ['./create-monitor-error-dialog.component.scss'],
})
export class CreateMonitorErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
