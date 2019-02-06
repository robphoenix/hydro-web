import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-monitor-form-name',
  templateUrl: './create-monitor-form-name.component.html',
  styleUrls: ['./create-monitor-form-name.component.scss'],
})
export class CreateMonitorFormNameComponent {
  @Input()
  validationMessages: { [key: string]: string };

  @Input()
  parent: FormGroup;

  @Input()
  placeholder: string;

  @Input()
  editForm: boolean;
}
