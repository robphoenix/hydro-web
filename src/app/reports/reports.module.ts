import { ReportsOptionsComponent } from './reports-options/reports-options.component';
import { ReportsComponent } from './reports/reports.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatExpansionModule,
  MatSelectModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ReportsComponent, ReportsOptionsComponent]
})
export class ReportsModule {}
