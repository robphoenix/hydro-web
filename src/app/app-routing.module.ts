import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorsComponent } from './monitors/monitors.component';

const routes: Routes = [
  { path: '', redirectTo: '/monitors', pathMatch: 'full' },
  { path: 'monitors', component: MonitorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
