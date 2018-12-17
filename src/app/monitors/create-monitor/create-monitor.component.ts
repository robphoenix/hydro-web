import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-create-monitor',
  templateUrl: './create-monitor.component.html',
  styleUrls: ['./create-monitor.component.scss'],
})
export class CreateMonitorComponent implements OnInit {
  nameMessage: string;
  descriptionMessage: string;
  formGroup: FormGroup;
  nameControl: FormControl;
  descriptionControl: FormControl;

  validationMessages = {
    name: {
      required: `You must enter a monitor name`,
      pattern: `Monitor name cannot contain punctuation characters`,
    },
    description: {
      required: `You must enter a monitor description`,
    },
  };

  constructor(private fb: FormBuilder) {
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+'),
    ]);
    this.descriptionControl = new FormControl('', [Validators.required]);
    this.formGroup = this.fb.group({
      name: this.nameControl,
      status: ['offline', Validators.required],
      description: this.descriptionControl,
    });
  }

  ngOnInit() {
    this.nameControl.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.nameControl.markAsDirty();
      this.nameControl.markAsTouched();
    });

    this.descriptionControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.descriptionControl.markAsDirty();
        this.descriptionControl.markAsTouched();
      });
  }
}
