import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { HydroMaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { FormatSqlPipe } from './format-sql.pipe';
import { ObjectKeysPipe } from './object-keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    HydroMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SearchInputComponent,
    MultipleSelectComponent,
    FormatSqlPipe,
    ObjectKeysPipe,
  ],
  exports: [
    SearchInputComponent,
    MultipleSelectComponent,
    FormatSqlPipe,
    ObjectKeysPipe,
  ],
})
export class SharedModule {}
