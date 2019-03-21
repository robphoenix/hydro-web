import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { OverviewTableComponent } from './overview-table/overview-table.component';
import { CellActionsComponent } from './cell-actions/cell-actions.component';
import { CellMonitorComponent } from './cell-monitor/cell-monitor.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CellMenuComponent } from './cell-menu/cell-menu.component';
import { CellCategoriesComponent } from './cell-categories/cell-categories.component';
import { RouterModule } from '@angular/router';
import { CreateMonitorFormComponent } from './create-monitor-form/create-monitor-form.component';
import { CreateMonitorFormStatusComponent } from './create-monitor-form-status/create-monitor-form-status.component';
import { CreateMonitorFormDescriptionComponent } from './create-monitor-form-description/create-monitor-form-description.component';
import { CreateMonitorFormCategoriesComponent } from './create-monitor-form-categories/create-monitor-form-categories.component';
import { CreateMonitorFormQueryComponent } from './create-monitor-form-query/create-monitor-form-query.component';
import { CreateMonitorFormActionsComponent } from './create-monitor-form-actions/create-monitor-form-actions.component';
import { AddMonitorComponent } from './add-monitor/add-monitor.component';
import { CreateMonitorFormGroupsComponent } from './create-monitor-form-groups/create-monitor-form-groups.component';
import { EditMonitorComponent } from './edit-monitor/edit-monitor.component';
import { DuplicateMonitorComponent } from './duplicate-monitor/duplicate-monitor.component';
import { EplQueryDialogComponent } from './epl-query-dialog/epl-query-dialog.component';
import { MonitorStatusChangeDialogComponent } from './monitor-status-change-dialog/monitor-status-change-dialog.component';
import { CreateMonitorFormPriorityComponent } from './create-monitor-form-priority/create-monitor-form-priority.component';
import { CreateMonitorFormCacheWindowComponent } from './create-monitor-form-cache-window/create-monitor-form-cache-window.component';
import { CreateMonitorFormNameComponent } from './create-monitor-form-name/create-monitor-form-name.component';
import { CreateMonitorFormTypeComponent } from './create-monitor-form-type/create-monitor-form-type.component';
import { ChangeEventDialogComponent } from './change-event-dialog/change-event-dialog.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OverviewPageComponent },
      { path: 'add', component: AddMonitorComponent },
      { path: ':id', component: MonitorComponent },
      { path: ':id/edit', component: EditMonitorComponent },
      { path: ':id/duplicate', component: DuplicateMonitorComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HydroMaterialModule,
  ],
  declarations: [
    MonitorComponent,
    OverviewTableComponent,
    CellActionsComponent,
    CellMonitorComponent,
    LoadingSpinnerComponent,
    CellMenuComponent,
    CellCategoriesComponent,
    CreateMonitorFormComponent,
    CreateMonitorFormStatusComponent,
    CreateMonitorFormDescriptionComponent,
    CreateMonitorFormCategoriesComponent,
    CreateMonitorFormQueryComponent,
    CreateMonitorFormActionsComponent,
    AddMonitorComponent,
    CreateMonitorFormGroupsComponent,
    EditMonitorComponent,
    DuplicateMonitorComponent,
    EplQueryDialogComponent,
    MonitorStatusChangeDialogComponent,
    CreateMonitorFormPriorityComponent,
    CreateMonitorFormCacheWindowComponent,
    CreateMonitorFormNameComponent,
    CreateMonitorFormTypeComponent,
    ChangeEventDialogComponent,
    OverviewPageComponent,
  ],
  entryComponents: [
    EplQueryDialogComponent,
    MonitorStatusChangeDialogComponent,
    ChangeEventDialogComponent,
  ],
})
export class MonitorsModule {}
