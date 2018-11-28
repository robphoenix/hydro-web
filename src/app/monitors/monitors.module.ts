import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { MonitorsListItemComponent } from './monitors-list-item/monitors-list-item.component';
import { MonitorsListHeadersComponent } from './monitors-list-headers/monitors-list-headers.component';
import { MonitorDeleteDialogComponent } from './monitor-delete-dialog/monitor-delete-dialog.component';
import { AddMonitorComponent } from './add-monitor/add-monitor.component';
import { MonitorDetailsFormComponent } from './monitor-details-form/monitor-details-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HydroMaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    MonitorsComponent,
    MonitorComponent,
    MonitorsListItemComponent,
    MonitorsListHeadersComponent,
    MonitorDeleteDialogComponent,
    AddMonitorComponent,
    MonitorDetailsFormComponent,
  ],
  entryComponents: [MonitorDeleteDialogComponent],
  exports: [MonitorsComponent],
})
export class MonitorsModule {}
