import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { LoginGuard } from './user/login.guard';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    UserModule,
    RouterModule.forRoot(
      [
        {
          path: 'monitors',
          canActivate: [AuthGuard],
          loadChildren: './monitors/monitors.module#MonitorsModule',
        },
        {
          path: 'actions',
          canActivate: [AuthGuard],
          loadChildren: './actions/actions.module#ActionsModule',
        },
        { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
        { path: '', redirectTo: 'monitors', pathMatch: 'full' },
      ],
      { preloadingStrategy: PreloadAllModules },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
