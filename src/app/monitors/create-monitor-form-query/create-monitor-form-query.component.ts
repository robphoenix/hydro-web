import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-monitor-form-query',
  templateUrl: './create-monitor-form-query.component.html',
  styleUrls: ['./create-monitor-form-query.component.scss'],
})
export class CreateMonitorFormQueryComponent {
  @Input()
  validationMessages: { [key: string]: string };

  @Input()
  parent: FormGroup;
}
