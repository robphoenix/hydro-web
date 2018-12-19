import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MonitorDeleteDialogComponent } from './monitor-delete-dialog/monitor-delete-dialog.component';
import { OverviewTableComponent } from './overview-table/overview-table.component';
import { CellActionsComponent } from './cell-actions/cell-actions.component';
import { CellMonitorComponent } from './cell-monitor/cell-monitor.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CellMenuComponent } from './cell-menu/cell-menu.component';
import { CellCategoriesComponent } from './cell-categories/cell-categories.component';
import { RouterModule } from '@angular/router';
import { CreateMonitorFormComponent } from './create-monitor-form/create-monitor-form.component';
import { MonitorsStandardComponent } from './monitors-standard/monitors-standard.component';
import { MonitorsSystemComponent } from './monitors-system/monitors-system.component';
import { MonitorsArchivedComponent } from './monitors-archived/monitors-archived.component';
import { MonitorsOverviewNavComponent } from './monitors-overview-nav/monitors-overview-nav.component';
import { CreateMonitorsFormNameComponent } from './create-monitors-form-name/create-monitors-form-name.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'standard', pathMatch: 'full' },
      { path: 'standard', component: MonitorsStandardComponent },
      { path: 'archived', component: MonitorsArchivedComponent },
      { path: 'system', component: MonitorsSystemComponent },
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
    CreateMonitorFormComponent,
    MonitorsStandardComponent,
    MonitorsSystemComponent,
    MonitorsArchivedComponent,
    MonitorsOverviewNavComponent,
    CreateMonitorsFormNameComponent,
  ],
  entryComponents: [MonitorDeleteDialogComponent],
})
export class MonitorsModule {}
