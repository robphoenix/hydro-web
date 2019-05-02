import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-form-section-email',
  templateUrl: './create-action-form-section-email.component.html',
  styleUrls: ['./create-action-form-section-email.component.scss'],
})
export class CreateActionSectionEmailComponent {
  sendLimit: number;
  batchTime: string;
  batchTimeOfDay: string;

  public emailAddresses: string[];

  @Input()
  actionType: string;

  @Input()
  availableParameters: string[] = [];

  @Input()
  emailTypes: string[];

  @Input()
  parent: FormGroup;

  @Input()
  validationMessages: { [key: string]: { [key: string]: string } };
}
