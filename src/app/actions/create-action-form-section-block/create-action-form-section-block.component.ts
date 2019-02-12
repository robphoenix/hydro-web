import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface IBlockValue {
  formGroup: FormGroup;
  label: string;
  units: string[];
}

@Component({
  selector: 'app-create-action-form-section-block',
  templateUrl: './create-action-form-section-block.component.html',
  styleUrls: ['./create-action-form-section-block.component.scss'],
})
export class CreateActionFormSectionBlockComponent implements OnInit {
  // temporary
  blockItems: string[] = [
    'IP Address',
    'IP Range',
    'User Agent',
    'XForwardedFor',
    'UQID',
    'STK',
  ];

  name: string;
  durationFormGroup: FormGroup;
  delayFormGroup: FormGroup;
  blockValues: IBlockValue[];
  unitsInSeconds: { [key: string]: number } = {
    seconds: 1,
    minutes: 60,
    hours: 60 * 60,
    days: 60 * 60 * 24,
  };

  @Input()
  parent: FormGroup;

  @Output()
  nameChange = new EventEmitter<string>();

  @Output()
  durationChange = new EventEmitter<number>();

  @Output()
  delayChange = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {
    this.durationFormGroup = this.fb.group({
      value: [''],
      unit: [''],
    });
    this.delayFormGroup = this.fb.group({
      value: [''],
      unit: [''],
    });
    this.blockValues = [
      {
        formGroup: this.durationFormGroup,
        label: 'Block Duration',
        units: ['minutes', 'hours', 'days'],
      },
      {
        formGroup: this.delayFormGroup,
        label: 'Block Delay',
        units: ['seconds', 'minutes', 'hours'],
      },
    ];
  }

  onBlockValueChange() {
    const durationUnit = this.durationFormGroup.get('unit').value;
    const durationValue = this.durationFormGroup.get('value').value;

    if (durationValue && durationUnit) {
      const numberOfSeconds = this.unitsInSeconds[durationUnit];
      const duration = durationValue * numberOfSeconds;
      this.durationChange.emit(duration);
      this.onNameChange();
    }

    const delayUnit = this.delayFormGroup.get('unit').value;
    const delayValue = this.delayFormGroup.get('value').value;

    if (delayValue && delayUnit) {
      const numberOfSeconds = this.unitsInSeconds[delayUnit];
      const delay = delayValue * numberOfSeconds;
      this.delayChange.emit(delay);
      this.onNameChange();
    }
  }

  ngOnInit(): void {
    this.onNameChange();
  }

  onNameChange() {
    const permanently = this.parent.get('permanently').value;
    const itemToBlockOn = this.parent.get('item').value.trim();
    const durationValue = this.durationFormGroup.get('value').value.trim();
    const durationUnit = this.durationFormGroup.get('unit').value.trim();
    const delayValue = this.delayFormGroup.get('value').value.trim();
    const delayUnit = this.delayFormGroup.get('unit').value.trim();

    const duration =
      !permanently && durationValue && durationUnit
        ? `for ${durationValue} ${durationUnit}`
        : '';

    const delay =
      !permanently && delayValue && delayUnit
        ? `with up to ${delayValue} ${delayUnit} random delay`
        : '';

    this.name = `Block ${itemToBlockOn} ${duration} ${delay} ${
      permanently ? 'permanently' : ''
    }`;

    this.nameChange.emit(this.name);
  }
}
