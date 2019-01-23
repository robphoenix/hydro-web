import { Component, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { MonitorPriority } from '../monitor';

@Component({
  selector: 'app-create-monitor-form-priority',
  templateUrl: './create-monitor-form-priority.component.html',
  styleUrls: ['./create-monitor-form-priority.component.scss'],
})
export class CreateMonitorFormPriorityComponent {
  max = MonitorPriority.Highest;
  min = MonitorPriority.Lowest;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = MonitorPriority.Lowest;
  tickInterval = 2;

  private priorities: string[] = ['lowest', 'low', 'mid', 'high', 'highest'];
  priority: string;

  @Input()
  parent: FormGroup;

  onInputChange(event: MatSliderChange) {
    this.priority = this.priorities[event.value - 1];
  }

  constructor() {
    this.priority = this.priorities[0];
  }
}
