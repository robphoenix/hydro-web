import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { HydroMaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { IconComponent } from './icon/icon.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AccentButtonComponent } from './accent-button/accent-button.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { AccentSubmitButtonComponent } from './accent-submit-button/accent-submit-button.component';
import { WarnButtonComponent } from './warn-button/warn-button.component';
import { HeadingComponent } from './heading/heading.component';
import { TableHeadingComponent } from './table-heading/table-heading.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LogoComponent } from './logo/logo.component';
import { ButtonRaisedComponent } from './button-raised/button-raised.component';
import { HeadlineComponent } from './headline/headline.component';

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
    PrimaryButtonComponent,
    AccentSubmitButtonComponent,
    WarnButtonComponent,
    HeadingComponent,
    TableHeadingComponent,
    DialogCloseButtonComponent,
    ErrorMessageComponent,
    LogoComponent,
    ButtonRaisedComponent,
    HeadlineComponent,
  ],
  exports: [
    SearchInputComponent,
    MultipleSelectComponent,
    IconComponent,
    AccentButtonComponent,
    AccentSubmitButtonComponent,
    PrimaryButtonComponent,
    WarnButtonComponent,
    HeadingComponent,
    TableHeadingComponent,
    DialogCloseButtonComponent,
    ErrorMessageComponent,
    LogoComponent,
    ButtonRaisedComponent,
    HeadlineComponent,
  ],
  entryComponents: [ErrorDialogComponent],
})
export class SharedModule {}
