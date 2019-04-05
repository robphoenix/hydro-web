import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlockParameters } from '../actions';

@Component({
  selector: 'app-create-action-form-section-block',
  templateUrl: './create-action-form-section-block.component.html',
  styleUrls: ['./create-action-form-section-block.component.scss'],
})
export class CreateActionFormSectionBlockComponent implements OnInit {
  public blockParameters: typeof BlockParameters = BlockParameters;
  public availableParameters: string[] = [];

  @Input()
  units: { [key: string]: string[] };

  @Input()
  parent: FormGroup;

  @Input()
  validationMessages: { [key: string]: { [key: string]: string } };

  ngOnInit(): void {
    this.availableParameters = Object.values(this.blockParameters);
  }
}
