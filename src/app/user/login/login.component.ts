import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;

  title = 'login';
  buttonText = 'log in';
  subtitle = 'Please enter your bet365 credentials';
  hidePassword = true;
  minPasswordLength = 8;
  attemptingLogIn = false;
  loginErrorMessage: string;

  validationMessages: { [key: string]: { [key: string]: string } } = {
    username: {
      required: `You must enter your bet365 username`,
    },
    password: {
      required: `You must enter your bet365 password`,
      minlength: `Password must be at least ${
        this.minPasswordLength
      } characters`,
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.usernameControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(this.minPasswordLength),
    ]);
    this.loginForm = new FormGroup({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  login() {
    this.attemptingLogIn = true;
    this.authService
      .login(this.usernameControl.value, this.passwordControl.value)
      .subscribe(
        () => {
          this.router.navigateByUrl(
            this.authService.redirectUrl || '/monitors',
          );
        },
        (err: string) => {
          this.attemptingLogIn = false;
          this.loginErrorMessage = err;
        },
      );
  }
}
