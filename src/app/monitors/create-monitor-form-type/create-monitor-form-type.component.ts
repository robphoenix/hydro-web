import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-monitor-form-type',
  templateUrl: './create-monitor-form-type.component.html',
  styleUrls: ['./create-monitor-form-type.component.scss'],
})
export class CreateMonitorFormTypeComponent {
  @Input()
  parent: FormGroup;
}
