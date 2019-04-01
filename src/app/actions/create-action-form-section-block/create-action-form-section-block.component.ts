import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-action-form-section-block',
  templateUrl: './create-action-form-section-block.component.html',
  styleUrls: ['./create-action-form-section-block.component.scss'],
})
export class CreateActionFormSectionBlockComponent {
  // temporary
  blockItems: string[] = [
    'IP Address',
    'IP Range',
    'User Agent',
    'XForwardedFor',
    'UQID',
    'STK',
  ];

  @Input()
  units: { [key: string]: string[] };

  @Input()
  parent: FormGroup;

  @Input()
  validationMessages: { [key: string]: { [key: string]: string } };
}
