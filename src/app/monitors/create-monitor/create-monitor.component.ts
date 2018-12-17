import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-monitor',
  templateUrl: './create-monitor.component.html',
  styleUrls: ['./create-monitor.component.scss'],
})
export class CreateMonitorComponent implements OnInit {
  nameMessage = '';
  descriptionMessage: string;
  formGroup: FormGroup;
  nameControl: FormControl;

  validationMessages = {
    name: {
      required: `Please enter a monitor name`,
      pattern: `Monitor name cannot contain punctuation characters`,
    },
  };

  constructor(private fb: FormBuilder) {
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+'),
    ]);
    this.formGroup = this.fb.group({
      name: this.nameControl,
      status: ['offline', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.nameControl.valueChanges.subscribe(() => this.setNameMessage());
  }

  setNameMessage(): void {
    const nc = this.nameControl;
    this.nameMessage = '';
    if ((nc.touched || nc.dirty) && nc.errors) {
      nc.markAsTouched(); // we need to mark the element as touched for mat-error to work.
      this.nameMessage = Object.keys(nc.errors).reduce(
        (prev: string, curr: string) => {
          return `${prev} ${this.validationMessages.name[curr]}`;
        },
        '',
      );
    }
  }

  setMessage(c: AbstractControl, controlName: string): void {
    const validationMessages = {
      required: `Please enter a monitor ${controlName}`,
      pattern: `Monitor ${controlName} cannot contain punctuation characters`,
    };
    // I don't know why, but we need to call this, otherwise mat-error doesn't
    // show on a failed pattern validation.
    // c.markAsTouched();
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
}
