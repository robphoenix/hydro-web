import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorsComponent } from './monitors/monitors/monitors.component';
import { MonitorComponent } from './monitors/monitor/monitor.component';

const routes: Routes = [
  { path: '', redirectTo: '/monitors', pathMatch: 'full' },
  {
    path: 'monitors',
    component: MonitorsComponent,
    children: [{ path: ':id', component: MonitorComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
