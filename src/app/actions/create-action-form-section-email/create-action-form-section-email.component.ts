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
  public emailTextDescription =
    // tslint:disable-next-line:max-line-length
    "The email text.This can be HTML.To customise this on the fly, use standard substitution points such as ${ uname }, ${ topic } and ${ sip }, where 'uname', topic and 'sip' are esper data fields.To display the esperdata there MUST be a ${ esperdata } substitution tag.The email service will replace this tag with a HTML table containing the data.You can also add all the EmailEvent attributes using the object's field name as the substitution value, eg: ${ name } will display the ExternalCallout name.";

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
  }
}
