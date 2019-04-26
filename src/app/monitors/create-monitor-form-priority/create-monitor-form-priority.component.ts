import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MonitorPriority } from '../monitor';

@Component({
  selector: 'hydro-create-monitor-form-priority',
  templateUrl: './create-monitor-form-priority.component.html',
  styleUrls: ['./create-monitor-form-priority.component.scss'],
})
export class CreateMonitorFormPriorityComponent {
  public monitorPriority: typeof MonitorPriority = MonitorPriority;

  @Input()
  parent: FormGroup;
}
