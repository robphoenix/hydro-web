import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateMonitorFormComponent } from './create-monitor-form/create-monitor-form.component';
import { CreateMonitorFormStatusComponent } from './create-monitor-form-status/create-monitor-form-status.component';
import { CreateMonitorFormDescriptionComponent } from './create-monitor-form-description/create-monitor-form-description.component';
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
import { CreateMonitorFormTypeComponent } from './create-monitor-form-type/create-monitor-form-type.component';
import { ChangeEventDialogComponent } from './change-event-dialog/change-event-dialog.component';
import { ViewMonitorsComponent } from './view-monitors/view-monitors.component';
import { ViewMonitorsListItemComponent } from './view-monitors-list-item/view-monitors-list-item.component';
import { ViewMonitorsListItemMenuComponent } from './view-monitors-list-item-menu/view-monitors-list-item-menu.component';
import { AllowsEditGuard } from '../user/allows-edit.guard';
import { ViewMonitorsStatusToggleComponent } from './view-monitors-status-toggle/view-monitors-status-toggle.component';
import { CreateMonitorNameComponent } from './create-monitor-name/create-monitor-name.component';
import { CreateMonitorCategoriesSelectComponent } from './create-monitor-categories-select/create-monitor-categories-select.component';
import { CreateMonitorCategoryAddComponent } from './create-monitor-category-add/create-monitor-category-add.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ViewMonitorsComponent },
      {
        path: 'add',
        component: AddMonitorComponent,
        canActivate: [AllowsEditGuard],
      },
      { path: ':id', component: MonitorComponent },
      {
        path: ':id/edit',
        component: EditMonitorComponent,
        canActivate: [AllowsEditGuard],
      },
      {
        path: ':id/duplicate',
        component: DuplicateMonitorComponent,
        canActivate: [AllowsEditGuard],
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HydroMaterialModule,
  ],
  declarations: [
    MonitorComponent,
    CreateMonitorFormComponent,
    CreateMonitorFormStatusComponent,
    CreateMonitorFormDescriptionComponent,
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
    CreateMonitorFormTypeComponent,
    ChangeEventDialogComponent,
    ViewMonitorsComponent,
    ViewMonitorsListItemComponent,
    ViewMonitorsListItemMenuComponent,
    ViewMonitorsStatusToggleComponent,
    CreateMonitorNameComponent,
    CreateMonitorCategoriesSelectComponent,
    CreateMonitorCategoryAddComponent,
    AddCategoryDialogComponent,
  ],
  entryComponents: [
    EplQueryDialogComponent,
    MonitorStatusChangeDialogComponent,
    ChangeEventDialogComponent,
    AddCategoryDialogComponent,
  ],
})
export class MonitorsModule {}
