import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { HydroMaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { FormatDatePipe } from './format-date.pipe';
import { FormatSqlPipe } from './format-sql.pipe';

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
    FormatDatePipe,
    FormatSqlPipe,
  ],
  exports: [
    SearchInputComponent,
    MultipleSelectComponent,
    FormatDatePipe,
    FormatSqlPipe,
  ],
})
export class SharedModule {}
