import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-monitor-form-description',
  templateUrl: './create-monitor-form-description.component.html',
  styleUrls: ['./create-monitor-form-description.component.scss'],
})
export class CreateMonitorFormDescriptionComponent {
  @Input()
  validationMessages: { [key: string]: string };

  @Input()
  parent: FormGroup;
}
