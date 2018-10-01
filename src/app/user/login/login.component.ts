import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit() {}

  login() {
    if (this.username.value === '') {
      this.username.markAsTouched();
    }
    if (this.password.value === '') {
      this.password.markAsTouched();
    }
    const username = this.username.value;
    const password = this.password.value;
    console.log({ username });
    console.log({ password });
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
}
