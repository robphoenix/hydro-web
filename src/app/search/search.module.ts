import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DictionarySearchComponent } from './dictionary-search/dictionary-search.component';
import { DictionaryResultComponent } from './dictionary-result/dictionary-result.component';
import { BlockHistoryComponent } from './block-history/block-history.component';
import { GeolocationDataComponent } from './geolocation-data/geolocation-data.component';
import { CrossReferenceComponent } from './cross-reference/cross-reference.component';
import { HydroMaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HydroMaterialModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    DictionarySearchComponent,
    DictionaryResultComponent,
    BlockHistoryComponent,
    GeolocationDataComponent,
    CrossReferenceComponent,
  ],
})
export class SearchModule {}
