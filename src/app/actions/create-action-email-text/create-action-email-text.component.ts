import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-email-text',
  templateUrl: './create-action-email-text.component.html',
  styleUrls: ['./create-action-email-text.component.scss'],
})
export class CreateActionEmailTextComponent {
  public validationMessage = `You must specify an email text`;

  @Input()
  parent: FormGroup;

  @Output()
  editorContentChange = new EventEmitter<{
    form: FormGroup;
    emailText: string;
  }>();

  public get hasError(): boolean {
    const ctrl = this.parent.get(`emailText`);
    return ctrl.touched && ctrl.hasError(`required`);
  }

  onBlur() {
    const ctrl = this.parent.get(`emailText`);
    if (ctrl) {
      ctrl.markAsTouched();
    }
  }

  public onContentChange(event: { html: string }) {
    const { html: emailText } = event;
    this.editorContentChange.emit({ form: this.parent, emailText });
  }
}
