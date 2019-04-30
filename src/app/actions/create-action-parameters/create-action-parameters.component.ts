import { Component, OnInit, Input } from '@angular/core';
import { ActionParameters } from '../action';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-parameters',
  templateUrl: './create-action-parameters.component.html',
  styleUrls: ['./create-action-parameters.component.scss'],
})
export class CreateActionParametersComponent implements OnInit {
  private actionParameters: typeof ActionParameters = ActionParameters;
  public parameters: string[] = [];
  public validationMessage = `You must choose parameters to block on`;

  @Input()
  parent: FormGroup;

  ngOnInit() {
    this.parameters = Object.values(this.actionParameters);
  }

  public get hasError(): boolean {
    return this.parent.get(`parameters`).hasError(`required`);
  }
}
