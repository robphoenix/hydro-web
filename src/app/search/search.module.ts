import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DictionarySearchComponent } from '../search/dictionary-search/dictionary-search.component';
import { DictionaryHelpDialogComponent } from '../search/dictionary-search/dictionary-help-dialog/dictionary-help-dialog.component';
import { DictionaryResultComponent } from '../search/dictionary-search/dictionary-result/dictionary-result.component';
import { BlockHistoryComponent } from './dictionary-search/dictionary-result/block-history/block-history.component';
import { GeolocationDataComponent } from './dictionary-search/dictionary-result/geolocation-data/geolocation-data.component';
import { CrossReferenceComponent } from './dictionary-search/dictionary-result/cross-reference/cross-reference.component';

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
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule
  ],
  entryComponents: [DictionaryHelpDialogComponent],
  declarations: [
    DictionarySearchComponent,
    DictionaryHelpDialogComponent,
    DictionaryResultComponent,
    BlockHistoryComponent,
    GeolocationDataComponent,
    CrossReferenceComponent
  ]
})
export class SearchModule {}
