import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-description',
  templateUrl: './create-action-description.component.html',
  styleUrls: ['./create-action-description.component.scss'],
})
export class CreateActionDescriptionComponent {
  public controlName = `description`;
  public validationMessage = `You must enter an action description`;

  @Input()
  parent: FormGroup;

  public get control(): AbstractControl {
    return this.parent.get(this.controlName);
  }

  public get hasError(): boolean {
    return this.control.hasError(`required`);
  }
}
