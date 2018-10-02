import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    if (this.loginForm.controls.username.value === '') {
      this.loginForm.controls.username.markAsTouched();
    }
    if (this.loginForm.controls.password.value === '') {
      this.loginForm.controls.password.markAsTouched();
    }
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    console.log({ username });
    console.log({ password });
  }

  getUsernameErrorMessage() {
    return this.loginForm.controls.username.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls.password.hasError('required')
      ? 'You must enter a value'
      : this.loginForm.controls.password.errors.minlength
        ? 'Password must be at least 5 characters'
        : '';
  }
}
