import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MonitorTableComponent } from './monitor-table/monitor-table.component';
import { HydroMaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterCategoriesPipe } from './monitors/filter-categories.pipe';
import { FilterTopicsPipe } from './monitors/filter-topics.pipe';

@NgModule({
  imports: [
    CommonModule,
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
    MonitorsListComponent,
    MonitorComponent,
    MonitorTableComponent,
    FilterCategoriesPipe,
    FilterTopicsPipe,
  ],
  exports: [MonitorsComponent],
})
export class MonitorsModule {}
