import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { HydroMaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { IconComponent } from './icon/icon.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AccentSubmitButtonComponent } from './accent-submit-button/accent-submit-button.component';
import { TableHeadingComponent } from './table-heading/table-heading.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { LogoComponent } from './logo/logo.component';
import { ButtonRaisedComponent } from './button-raised/button-raised.component';
import { HeadlineComponent } from './headline/headline.component';
import { ButtonFlatComponent } from './button-flat/button-flat.component';
import { PageNarrowComponent } from './page-narrow/page-narrow.component';
import { PageWideComponent } from './page-wide/page-wide.component';

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
    AccentSubmitButtonComponent,
    TableHeadingComponent,
    DialogCloseButtonComponent,
    LogoComponent,
    ButtonRaisedComponent,
    HeadlineComponent,
    ButtonFlatComponent,
    PageNarrowComponent,
    PageWideComponent,
  ],
  exports: [
    SearchInputComponent,
    MultipleSelectComponent,
    IconComponent,
    AccentSubmitButtonComponent,
    TableHeadingComponent,
    DialogCloseButtonComponent,
    LogoComponent,
    ButtonRaisedComponent,
    HeadlineComponent,
    ButtonFlatComponent,
    PageNarrowComponent,
    PageWideComponent,
  ],
  entryComponents: [ErrorDialogComponent],
})
export class SharedModule {}
