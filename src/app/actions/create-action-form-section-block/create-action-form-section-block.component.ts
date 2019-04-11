import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionParameters } from '../action';

@Component({
  selector: 'app-create-action-form-section-block',
  templateUrl: './create-action-form-section-block.component.html',
  styleUrls: ['./create-action-form-section-block.component.scss'],
})
export class CreateActionFormSectionBlockComponent implements OnInit {
  private parameters: typeof ActionParameters = ActionParameters;
  public availableParameters: string[] = [];

  @Input()
  units: { [key: string]: string[] };

  @Input()
  parent: FormGroup;

  @Input()
  validationMessages: { [key: string]: { [key: string]: string } };

  ngOnInit(): void {
    this.availableParameters = Object.values(this.parameters);
  }
}
