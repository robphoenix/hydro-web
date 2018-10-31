import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonitorsComponent } from './monitors/monitors/monitors.component';
import { MonitorComponent } from './monitors/monitor/monitor.component';
import { DictionarySearchComponent } from './search/dictionary-search/dictionary-search.component';
import { DictionaryResultComponent } from './search/dictionary-result/dictionary-result.component';
import { LoginGuard } from './user/login.guard';
import { ShowmeComponent } from './temp/showme/showme.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'monitors', pathMatch: 'full' },
      {
        path: 'monitors',
        component: MonitorsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'monitors/:id',
        component: MonitorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        component: DictionarySearchComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search/:type/:value',
        component: DictionaryResultComponent,
        canActivate: [AuthGuard],
      },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      {
        path: 'showme',
        component: ShowmeComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
