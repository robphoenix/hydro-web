import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  availableParameters: string[] = [];

  @Input()
  emailTypes: string[];

  @Input()
  parent: FormGroup;

  @Output()
  editorContentChange = new EventEmitter<string>();

  @Output()
  addEmailAddress = new EventEmitter();

  emailAddressInvalid(i: number): boolean {
    return (this.parent.get('emailAddresses') as FormArray).controls[i].invalid;
  }

  get emailAddressesArray(): FormArray {
    return this.parent.get('emailAddresses') as FormArray;
  }

  onContentChange(event: { html: string }) {
    const { html } = event;
    this.editorContentChange.emit(html);

    console.log('content change');
    console.log({ event });
  }
}
