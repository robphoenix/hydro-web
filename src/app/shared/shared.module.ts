import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { HydroMaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    HydroMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SearchInputComponent, MultipleSelectComponent, FormatDatePipe],
  exports: [SearchInputComponent, MultipleSelectComponent, FormatDatePipe],
})
export class SharedModule {}
