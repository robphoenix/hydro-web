import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginGuard } from './login.guard';
import { HydroMaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HydroMaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4200', 'mn2splmfe001sd0:4200'],
      },
    }),
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuard, LoginGuard],
})
export class UserModule {}
