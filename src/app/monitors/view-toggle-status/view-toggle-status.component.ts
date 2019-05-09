import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'hydro-view-toggle-status',
  templateUrl: './view-toggle-status.component.html',
  styleUrls: ['./view-toggle-status.component.scss'],
})
export class ViewToggleStatusComponent implements OnInit {
  public statuses: string[] = [`all monitors`, `online`, `offline`];

  @Input()
  status: string;

  @Output()
  toggleStatus = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public onToggleStatus(event: MatButtonToggleChange) {
    this.toggleStatus.emit(event.value);
  }
}
