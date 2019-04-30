import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-name',
  templateUrl: './create-action-name.component.html',
  styleUrls: ['./create-action-name.component.scss'],
})
export class CreateActionNameComponent {
  public controlName = `name`;
  public validationMessage = `You must enter an action name`;

  @Input()
  parent: FormGroup;

  public get control(): AbstractControl {
    return this.parent.get(this.controlName);
  }

  public get hasError(): boolean {
    return this.control.hasError(`required`);
  }
}
