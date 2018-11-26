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
  subtitle = 'Please enter your bet365 credentials';
  hidePassword = true;
  minPasswordLength = 8;
  attemptingLogIn = false;
  loginErrorMessage: string;

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

  usernameValidationMessage(): string {
    return (this.usernameControl.touched || this.usernameControl.dirty) &&
      this.usernameControl.errors
      ? 'Please enter your bet365 username'
      : '';
  }

  passwordValidationMessage(): string {
    const validationMessages = {
      required: 'Please enter your bet365 password',
      minlength: `Password must be at least ${
        this.minPasswordLength
      } characters`,
    };

    return (this.passwordControl.touched || this.passwordControl.dirty) &&
      this.passwordControl.errors
      ? Object.keys(this.passwordControl.errors)
          .map((error) => validationMessages[error])
          .join(' ')
      : '';
  }
}
