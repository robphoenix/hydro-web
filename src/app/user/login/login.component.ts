import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Log In';
  subtitle = 'Please enter your bet365 credentials.';
  hidePassword = true;
  loginForm: FormGroup;
  loginErrorMessage: string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    // Pull the URL to go to after login out of the query params
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/monitors';
  }

  login() {
    const username = this.loginForm.controls.username;
    const password = this.loginForm.controls.password;

    username.markAsTouched();
    password.markAsTouched();

    if (!username.value || !password.value) {
      return;
    }

    this.authService
      .login(username.value, password.value)
      .subscribe(
        () => this.router.navigateByUrl(this.returnUrl),
        (err: string) => (this.loginErrorMessage = err),
      );
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
