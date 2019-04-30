import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-name',
  templateUrl: './create-action-name.component.html',
  styleUrls: ['./create-action-name.component.scss'],
})
export class CreateActionNameComponent {
  @Input()
  parent: FormGroup;

  @Input()
  validationMessage: String;

  @Input()
  control: AbstractControl;

  @Input()
  controlName: String;

  @Input()
  label: String;

  @Input()
  hint: String;

  public get hasError(): boolean {
    return this.control.hasError('required');
  }
}
