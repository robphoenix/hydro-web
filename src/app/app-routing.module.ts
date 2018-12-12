import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './user/login.guard';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    UserModule,
    RouterModule.forRoot([
      {
        path: 'monitors',
        canActivate: [AuthGuard],
        loadChildren: './monitors/monitors.module#MonitorsModule',
      },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: '', redirectTo: 'monitors', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
