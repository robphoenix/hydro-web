import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-email-subject',
  templateUrl: './create-action-email-subject.component.html',
  styleUrls: ['./create-action-email-subject.component.scss'],
})
export class CreateActionEmailSubjectComponent {
  public validationMessage = `You must specify an email subject`;

  @Input()
  parent: FormGroup;

  public get hasError(): boolean {
    return this.parent.get(`emailSubject`).hasError(`required`);
  }
}
