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
import { MonitorsCardComponent } from './monitors-card/monitors-card.component';
import { SharedModule } from '../shared/shared.module';

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
  declarations: [MonitorsComponent, MonitorComponent, MonitorsCardComponent],
  exports: [MonitorsComponent],
})
export class MonitorsModule {}
