import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
} from '@angular/material';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4200', 'mn2splpfa001sl0:4200'],
      },
    }),

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuard],
})
export class UserModule {}
