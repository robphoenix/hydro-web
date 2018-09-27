import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { DictionarySearchComponent } from './dictionary-search/dictionary-search.component';
import { GeolocationSearchComponent } from './geolocation-search/geolocation-search.component';
import { DictionaryHelpDialogComponent } from './dictionary-search/dictionary-help-dialog/dictionary-help-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  entryComponents: [DictionaryHelpDialogComponent],
  declarations: [
    ReportsComponent,
    DictionarySearchComponent,
    GeolocationSearchComponent,
    DictionaryHelpDialogComponent
  ]
})
export class ReportsModule {}
