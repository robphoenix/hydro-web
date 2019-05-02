import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-email-text',
  templateUrl: './create-action-email-text.component.html',
  styleUrls: ['./create-action-email-text.component.scss'],
})
export class CreateActionEmailTextComponent implements OnInit {
  public validationMessage = `You must specify an email text`;

  @Input()
  parent: FormGroup;

  @Output()
  editorContentChange = new EventEmitter<{
    form: FormGroup;
    emailText: string;
  }>();

  public get hasError(): boolean {
    return this.parent.get(`emailText`).hasError(`required`);
  }

  public onContentChange(event: { html: string }) {
    const { html } = event;
    const form = this.parent;
    const emailText = html;
    this.editorContentChange.emit({ form, emailText });
  }

  constructor() {}

  ngOnInit() {}
}
