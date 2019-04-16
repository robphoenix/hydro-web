import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-action-form-section-email',
  templateUrl: './create-action-form-section-email.component.html',
  styleUrls: ['./create-action-form-section-email.component.scss'],
})
export class CreateActionFormSectionEmailComponent implements OnInit {
  sendLimit: number;
  batchTime: string;
  batchTimeOfDay: string;

  public selectedEmailType: string;

  public emailAddresses: string[];

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

  emailTypeExplanation = {
    // tslint:disable-next-line:max-line-length
    Alert: `The properties you define below will be used to send out an email for every esper event. Once an alert value such as an IP (eg 1.1.1.1) or session token has been sent then it, and all other data in the same row, will be ignored for four days and any future emails will not reference it even though it was part of an esper event.`,
    // tslint:disable-next-line:max-line-length
    Batch: `The properties you define below will be used to batch esper events into email sent every day at the time specified`,
    // tslint:disable-next-line:max-line-length
    Rate: `The properties you define below will be used to send out emails at a maximum number per hour`,
  };

  ngOnInit(): void {
    this.selectedEmailType = this.emailTypes[0];
  }

  get emailAddressesArray(): FormArray {
    return this.parent.get('emailAddresses') as FormArray;
  }

  invalidBet365Email(index: number): boolean {
    const errors = this.emailAddressesArray.controls[index].get('emailAddress')
      .errors;
    return errors && errors.validBet365Email;
  }

  onContentChange(event: { html: string }) {
    const { html } = event;
    this.editorContentChange.emit(html);

    console.log('content change');
    console.log({ event });
  }
}
