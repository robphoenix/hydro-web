import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-action-form',
  templateUrl: './create-action-form.component.html',
  styleUrls: ['./create-action-form.component.scss'],
})
export class CreateActionFormComponent implements OnInit {
  name: string;
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
  unitsInSeconds: { [key: string]: number } = {
    seconds: 1,
    minutes: 60,
    hours: 60 * 60,
    days: 60 * 60 * 24,
  };

  blockActionUnits: { [key: string]: string[] } = {
    duration: ['minutes', 'hours', 'days'],
    delay: ['seconds', 'minutes', 'hours'],
  };

  @Input()
  title: string;

  constructor(private fb: FormBuilder) {
    this.blockDataForm = this.fb.group({
      item: ['', Validators.required],
      permanently: [false],
      durationValue: [''],
      durationUnit: [''],
      delayValue: [''],
      delayUnit: [''],
    });
    this.createActionForm = this.fb.group({
      description: ['', Validators.required],
      type: ['block', Validators.required],
      blockData: this.blockDataForm,
    });
  }

  ngOnInit() {
    this.name = this.blockName();
    this.createActionForm.valueChanges.subscribe((form) => {
      if (form.type === 'block') {
        this.name = this.blockName();
      }
    });
  }

  blockName(): string {
    const form = this.blockDataForm;
    const permanently = form.get('permanently').value;
    const itemToBlockOn = form.get('item').value.trim();
    const durationValue = form.get('durationValue').value.trim();
    const durationUnit = form.get('durationUnit').value.trim();
    const delayValue = form.get('delayValue').value.trim();
    const delayUnit = form.get('delayUnit').value.trim();

    const duration =
      !permanently && durationValue && durationUnit
        ? `for ${durationValue} ${durationUnit}`
        : '';

    const delay =
      !permanently && delayValue && delayUnit
        ? `with up to ${delayValue} ${delayUnit} random delay`
        : '';

    return `Block ${itemToBlockOn} ${duration} ${delay} ${
      permanently ? 'permanently' : ''
    }`;
  }

  onSubmit() {
    const durationUnit = this.blockDataForm.get('durationUnit').value;
    const durationValue = this.blockDataForm.get('durationValue').value;

    if (durationValue && durationUnit) {
      const numberOfSeconds = this.unitsInSeconds[durationUnit];
      // const duration = durationValue * numberOfSeconds;
    }

    const delayUnit = this.blockDataForm.get('delayUnit').value;
    const delayValue = this.blockDataForm.get('delayValue').value;

    if (delayValue && delayUnit) {
      const numberOfSeconds = this.unitsInSeconds[delayUnit];
      // const delay = delayValue * numberOfSeconds;
    }
  }
}
