import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-action-form-section-email',
  templateUrl: './create-action-form-section-email.component.html',
  styleUrls: ['./create-action-form-section-email.component.scss'],
})
export class CreateActionFormSectionEmailComponent {
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

  @Output()
  editorContentChange = new EventEmitter<string>();

  @Output()
  addEmailAddress = new EventEmitter();

  @Output()
  removeEmailAddress = new EventEmitter<number>();

  get emailAddressesArray(): FormArray {
    return this.parent.get('emailAddresses') as FormArray;
  }

  invalidBet365Email(index: number): boolean {
    return this.emailAddressesArray.controls[index]
      .get('emailAddress')
      .hasError('validBet365Email');
  }

  onContentChange(event: { html: string }) {
    const { html } = event;
    this.editorContentChange.emit(html);

    console.log('content change');
    console.log({ event });
  }
}
