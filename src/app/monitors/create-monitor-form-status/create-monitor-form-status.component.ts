import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-monitor-form-status',
  templateUrl: './create-monitor-form-status.component.html',
  styleUrls: ['./create-monitor-form-status.component.scss'],
})
export class CreateMonitorFormStatusComponent {
  @Input()
  parent: FormGroup;
}
