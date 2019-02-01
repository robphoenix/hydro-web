import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { HydroMaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { IconComponent } from './icon/icon.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AccentButtonComponent } from './accent-button/accent-button.component';
import { AccentLinkButtonComponent } from './accent-link-button/accent-link-button.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { AccentSubmitButtonComponent } from './accent-submit-button/accent-submit-button.component';
import { WarnButtonComponent } from './warn-button/warn-button.component';

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
    IconComponent,
    ErrorDialogComponent,
    AccentButtonComponent,
    AccentLinkButtonComponent,
    PrimaryButtonComponent,
    AccentSubmitButtonComponent,
    WarnButtonComponent,
  ],
  exports: [
    SearchInputComponent,
    MultipleSelectComponent,
    IconComponent,
    AccentButtonComponent,
    AccentLinkButtonComponent,
    AccentSubmitButtonComponent,
    PrimaryButtonComponent,
    WarnButtonComponent,
  ],
  entryComponents: [ErrorDialogComponent],
})
export class SharedModule {}
