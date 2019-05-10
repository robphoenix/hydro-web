import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonitorStatus, MonitorType } from '../monitor';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'hydro-monitors-type-toggle',
  templateUrl: './monitors-type-toggle.component.html',
  styleUrls: ['./monitors-type-toggle.component.scss'],
})
export class MonitorsTypeToggleComponent {
  monitorsTypes: string[] = [`standard`, `archived`, `system`];

  @Input()
  monitorsType: MonitorStatus | MonitorType;

  @Output()
  monitorsTypeChange = new EventEmitter<string>();

  onChange(event: MatButtonToggleChange) {
    this.monitorsTypeChange.emit(event.value);
  }
}
