import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-monitor-definition-formgroup',
  templateUrl: './monitor-definition-formgroup.component.html',
  styleUrls: ['./monitor-definition-formgroup.component.scss'],
})
export class MonitorDefinitionFormgroupComponent implements OnInit {
  nameMessage: string;
  descriptionMessage: string;
  definitionFormGroup: FormGroup;

  @Input()
  stepper: MatStepper;

  constructor(private fb: FormBuilder) {
    this.definitionFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      status: ['offline', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    const nameControl = this.definitionFormGroup.get('name');
    nameControl.valueChanges.subscribe(() =>
      this.setMessage(nameControl, 'name'),
    );
    const descriptionControl = this.definitionFormGroup.get('description');
    descriptionControl.valueChanges.subscribe(() =>
      this.setMessage(descriptionControl, 'description'),
    );
  }

  setMessage(c: AbstractControl, controlName: string): void {
    const validationMessages = {
      required: `Please enter a monitor ${controlName}`,
      pattern: `Monitor ${controlName} cannot contain punctuation characters`,
    };
    // I don't know why, but we need to call this, otherwise mat-error doesn't
    // show on a failed pattern validation.
    c.markAsTouched();
    let msg: string;
    if ((c.touched || c.dirty) && c.errors) {
      msg = Object.keys(c.errors)
        .map((error) => validationMessages[error])
        .join(' ');
    }
    if (controlName === 'name') {
      this.nameMessage = msg;
    }
    if (controlName === 'description') {
      this.descriptionMessage = msg;
    }
  }

  validateForm() {
    const controls = this.definitionFormGroup.controls;
    const controlKeys = Object.keys(controls);
    Object.values(controls).map((fc: FormControl, i: number) =>
      this.setMessage(fc, controlKeys[i]),
    );

    if (this.definitionFormGroup.valid) {
      this.stepper.next();
    }
  }
}
