import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-description',
  templateUrl: './create-action-description.component.html',
  styleUrls: ['./create-action-description.component.scss'],
})
export class CreateActionDescriptionComponent {
  public validationMessage = `You must enter an action description`;

  @Input()
  parent: FormGroup;

  public get hasError(): boolean {
    return this.parent.get(`description`).hasError(`required`);
  }
}
