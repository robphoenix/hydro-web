import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-action-form',
  templateUrl: './create-action-form.component.html',
  styleUrls: ['./create-action-form.component.scss'],
})
export class CreateActionFormComponent implements OnInit {
  createActionForm: FormGroup;
  blockDataForm: FormGroup;

  @Input()
  title: string;

  constructor(private fb: FormBuilder) {
    this.blockDataForm = this.fb.group({
      item: [''],
      permanently: [false],
      duration: [0],
      delay: [0],
    });
    this.createActionForm = this.fb.group({
      name: [''],
      description: [''],
      type: ['block'],
      blockData: this.blockDataForm,
    });
  }

  onNameChange(name: string) {
    this.createActionForm.get('name').setValue(name.trim());
    const form = this.createActionForm.value;
    console.log({ form });
  }

  onDurationChange(duration: number) {
    this.blockDataForm.get('duration').setValue(duration);
  }

  onDelayChange(delay: number) {
    this.blockDataForm.get('delay').setValue(delay);
  }

  ngOnInit() {}
}
