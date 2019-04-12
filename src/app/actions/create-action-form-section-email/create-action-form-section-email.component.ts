import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-action-form-section-email',
  templateUrl: './create-action-form-section-email.component.html',
  styleUrls: ['./create-action-form-section-email.component.scss'],
})
export class CreateActionFormSectionEmailComponent implements OnInit {
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

  ngOnInit(): void {
    this.emailAddresses = this.parent.get('emailAddresses').value;
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
