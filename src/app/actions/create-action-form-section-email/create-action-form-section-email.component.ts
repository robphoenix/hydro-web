import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-action-form-section-email',
  templateUrl: './create-action-form-section-email.component.html',
  styleUrls: ['./create-action-form-section-email.component.scss'],
})
export class CreateActionFormSectionEmailComponent implements OnInit {
  emails: string[] = ['Forensic Monitoring', 'FRM', 'OTS'];
  selectedEmails: string[];
  templates: string[] = ['Template 1', 'Template 2', 'Template 3'];
  selectedTemplate: string;
  emailTypes: string[] = ['Rate', 'Batch', 'Alert'];
  selectedEmailType: string;
  fields: string[] = ['sip', 'stk'];
  selectedFields: string[];
  sendLimit: number;
  batchTime: string;
  batchTimeOfDay: string;

  @Output()
  editorContentChange = new EventEmitter<string>();

  onContentChange(event: { html: string }) {
    const { html } = event;
    this.editorContentChange.emit(html);

    console.log('content change');
    console.log({ event });
  }

  ngOnInit() {}
}
