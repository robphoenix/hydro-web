import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-action-form',
  templateUrl: './create-action-form.component.html',
  styleUrls: ['./create-action-form.component.scss'],
})
export class CreateActionFormComponent implements OnInit {
  createActionForm: FormGroup;

  @Input()
  title: string;

  constructor(private fb: FormBuilder) {
    this.createActionForm = this.fb.group({
      name: [''],
    });
  }

  updateName(name: string) {
    this.createActionForm.get('name').setValue(name);
  }

  ngOnInit() {}
}
