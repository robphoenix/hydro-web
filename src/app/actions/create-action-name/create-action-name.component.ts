import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-name',
  templateUrl: './create-action-name.component.html',
  styleUrls: ['./create-action-name.component.scss'],
})
export class CreateActionNameComponent {
  public validationMessage = `You must enter an action name`;

  @Input()
  parent: FormGroup;

  public get hasError(): boolean {
    return this.parent.get(`name`).hasError(`required`);
  }
}
