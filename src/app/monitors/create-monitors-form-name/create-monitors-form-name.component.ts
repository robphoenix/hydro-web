import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-monitors-form-name',
  templateUrl: './create-monitors-form-name.component.html',
  styleUrls: ['./create-monitors-form-name.component.scss'],
})
export class CreateMonitorsFormNameComponent {
  @Input()
  validationMessages: { [key: string]: string };

  @Input()
  parent: FormGroup;
}
