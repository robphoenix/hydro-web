import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionGroup } from 'src/app/monitors/monitor';

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
    blockParameter: {
      required: `You must choose parameters to block on`,
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
      blockParameters: [[''], Validators.required],
      permanently: [false],
      blockTime: [''],
      blockTimeUnit: [''],
      blockDelay: [''],
      blockDelayUnit: [''],
    });
    this.createActionForm = this.fb.group({
      description: ['', Validators.required],
      type: [ActionGroup.Block, Validators.required],
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
    const blockParameter = form
      .get('blockParameters')
      .value.map((param: string) => param.trim());
    const blockTime = form.get('blockTime').value.trim();
    const blockTimeUnit = form.get('blockTimeUnit').value.trim();
    const blockDelay = form.get('blockDelay').value.trim();
    const blockDelayUnit = form.get('blockDelayUnit').value.trim();

    const duration =
      !permanently && blockTime && blockTimeUnit
        ? `for ${blockTime} ${blockTimeUnit}`
        : '';

    const delay =
      !permanently && blockDelay && blockDelayUnit
        ? `with up to ${blockDelay} ${blockDelayUnit} random delay`
        : '';

    return `Block ${blockParameter} ${duration} ${delay} ${
      permanently ? 'permanently' : ''
    }`;
  }

  onSubmit() {
    const blockTimeUnit = this.blockDataForm.get('blockTimeUnit').value;
    const blockTime = this.blockDataForm.get('blockTime').value;

    if (blockTime && blockTimeUnit) {
      const numberOfSeconds = this.unitsInSeconds[blockTimeUnit];
      // const duration = blockTime * numberOfSeconds;
    }

    const blockDelayUnit = this.blockDataForm.get('blockDelayUnit').value;
    const blockDelay = this.blockDataForm.get('blockDelay').value;

    if (blockDelay && blockDelayUnit) {
      const numberOfSeconds = this.unitsInSeconds[blockDelayUnit];
      // const delay = blockDelay * numberOfSeconds;
    }
  }
}
