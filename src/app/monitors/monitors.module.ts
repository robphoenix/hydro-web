import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MonitorDeleteDialogComponent } from './monitor-delete-dialog/monitor-delete-dialog.component';
import { StandardMonitorsComponent } from './standard-monitors/standard-monitors.component';
import { OverviewTableComponent } from './overview-table/overview-table.component';
import { CellActionsComponent } from './cell-actions/cell-actions.component';
import { CellMonitorComponent } from './cell-monitor/cell-monitor.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CellMenuComponent } from './cell-menu/cell-menu.component';
import { CellCategoriesComponent } from './cell-categories/cell-categories.component';
import { RouterModule } from '@angular/router';
import { ArchivedMonitorsComponent } from './archived-monitors/archived-monitors.component';
import { SystemMonitorsComponent } from './system-monitors/system-monitors.component';
import { CreateMonitorFormComponent } from './create-monitor-form/create-monitor-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'standard', pathMatch: 'full' },
      { path: 'standard', component: StandardMonitorsComponent },
      { path: 'archived', component: ArchivedMonitorsComponent },
      { path: 'system', component: SystemMonitorsComponent },
      { path: 'create', component: CreateMonitorFormComponent },
      { path: ':id', component: MonitorComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HydroMaterialModule,
  ],
  declarations: [
    MonitorComponent,
    MonitorDeleteDialogComponent,
    OverviewTableComponent,
    CellActionsComponent,
    CellMonitorComponent,
    LoadingSpinnerComponent,
    CellMenuComponent,
    CellCategoriesComponent,
    StandardMonitorsComponent,
    ArchivedMonitorsComponent,
    SystemMonitorsComponent,
    CreateMonitorFormComponent,
  ],
  entryComponents: [MonitorDeleteDialogComponent],
})
export class MonitorsModule {}
