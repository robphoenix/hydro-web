import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-monitor-details-form',
  templateUrl: './monitor-details-form.component.html',
  styleUrls: ['./monitor-details-form.component.scss'],
})
export class MonitorDetailsFormComponent implements OnInit {
  isLinear = true;
  detailsFormGroup: FormGroup;
  nameControl: FormControl;
  categoriesFormGroup: FormGroup;
  eplFormGroup: FormGroup;
  actionsFormGroup: FormGroup;
  groupsFormGroup: FormGroup;

  nameMessage: string;
  descriptionMessage: string;

  allCategories: string[] = [
    'script-attack',
    'Mobile',
    'Sports Book',
    'JohnSnow',
    'BetSlip',
    'GavinEdwards',
    'Scrapers',
    'China Arbs',
    'bettingslip',
    'Extra',
    'FRM',
    'Alerts',
    'NewLoginDefault',
    'Members',
    'Monitor',
    'Blocking',
    'Investigation',
    'HoneyPot',
    'Publisher',
    'Datacenter',
    'LoginAttack',
    'Bookmaker',
    'hostingfacility',
    'geo',
    'Martin',
    'OpenAccount',
    'Ragbag',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.detailsFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      status: ['offline', Validators.required],
      description: ['', Validators.required],
    });
    const nameControl = this.detailsFormGroup.get('name');
    nameControl.valueChanges.subscribe(() =>
      this.setMessage(nameControl, 'name'),
    );
    const descriptionControl = this.detailsFormGroup.get('description');
    descriptionControl.valueChanges.subscribe(() =>
      this.setMessage(descriptionControl, 'description'),
    );

    this.categoriesFormGroup = this.fb.group({
      categories: [[], Validators.required],
    });
    this.eplFormGroup = this.fb.group({
      eplQuery: ['', Validators.required],
    });
    this.actionsFormGroup = this.fb.group({});
    this.groupsFormGroup = this.fb.group({});
  }

  setMessage(c: AbstractControl, controlName: string): void {
    const validationMessages = {
      required: `Please enter a monitor ${controlName}`,
      pattern: `Monitor ${controlName} cannot contain punctuation characters`,
    };
    switch (controlName) {
      case 'name':
        this.nameMessage = '';
        break;
      case 'description':
        this.descriptionMessage = '';
        break;
    }
    // I don't know why, but we need to call this, otherwise mat-error doesn't
    // show on a failed pattern validation.
    c.markAsTouched();
    let msg: string;
    if ((c.touched || c.dirty) && c.errors) {
      msg = Object.keys(c.errors)
        .map((error) => validationMessages[error])
        .join(' ');
    }
    switch (controlName) {
      case 'name':
        this.nameMessage = msg;
        break;
      case 'description':
        this.descriptionMessage = msg;
        break;
    }
  }

  validateForm(stepper: MatStepper, fg: FormGroup) {
    const controls = fg.controls;
    const controlKeys = Object.keys(controls);
    Object.values(controls).map((fc: FormControl, i: number) =>
      this.setMessage(fc, controlKeys[i]),
    );

    if (fg.valid) {
      stepper.next();
    }
  }
}
