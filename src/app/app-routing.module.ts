import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorsComponent } from './monitors/monitors/monitors.component';
import { MonitorComponent } from './monitors/monitor/monitor.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { DictionarySearchComponent } from './reports/dictionary-search/dictionary-search.component';
import { GeolocationSearchComponent } from './reports/geolocation-search/geolocation-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/monitors', pathMatch: 'full' },
  {
    path: 'monitors',
    component: MonitorsComponent,
    children: [{ path: ':id', component: MonitorComponent }]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    children: [
      { path: 'geolocation', component: GeolocationSearchComponent },
      { path: 'dictionary', component: DictionarySearchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
