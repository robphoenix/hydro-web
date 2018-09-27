import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dictionary-help-dialog',
  templateUrl: './dictionary-help-dialog.component.html',
  styleUrls: ['./dictionary-help-dialog.component.scss']
})
export class DictionaryHelpDialogComponent implements OnInit {
  constructor(
    public thisDialogRef: MatDialogRef<DictionaryHelpDialogComponent>
  ) {}

  onClose() {
    this.thisDialogRef.close();
  }

  ngOnInit() {}
}
