import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-action-form',
  templateUrl: './create-action-form.component.html',
  styleUrls: ['./create-action-form.component.scss'],
})
export class CreateActionFormComponent implements OnInit {
  createActionForm: FormGroup;
  blockDataForm: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } } = {
    description: {
      required: `You must enter an action description`,
    },
    item: {
      required: `You must choose an item to block on`,
    },
  };

  @Input()
  title: string;

  constructor(private fb: FormBuilder) {
    this.blockDataForm = this.fb.group({
      item: ['', Validators.required],
      permanently: [false],
      duration: [0],
      delay: [0],
    });
    this.createActionForm = this.fb.group({
      name: [''],
      description: ['', Validators.required],
      type: ['block', Validators.required],
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
