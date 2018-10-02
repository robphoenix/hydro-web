import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorsComponent } from './monitors/monitors/monitors.component';
import { MonitorComponent } from './monitors/monitor/monitor.component';
import { DictionarySearchComponent } from './search/dictionary-search/dictionary-search.component';
import { DictionaryResultComponent } from './search/dictionary-result/dictionary-result.component';

const routes: Routes = [
  { path: '', redirectTo: '/monitors', pathMatch: 'full' },
  {
    path: 'monitors',
    component: MonitorsComponent,
    children: [{ path: ':id', component: MonitorComponent }],
  },
  {
    path: 'search',
    component: DictionarySearchComponent,
  },
  { path: 'search/:type/:value', component: DictionaryResultComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
