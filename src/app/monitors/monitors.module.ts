import { PipesModule } from './../pipes/pipes.module';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsComponent } from './monitors/monitors.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule,
  MatExpansionModule,
  MatInputModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MonitorTableComponent } from './monitor-table/monitor-table.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,

    PipesModule,

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatExpansionModule,
    MatInputModule,
  ],
  declarations: [
    MonitorsComponent,
    MonitorsListComponent,
    MonitorComponent,
    MonitorTableComponent,
  ],
  exports: [MonitorsComponent],
})
export class MonitorsModule {}
