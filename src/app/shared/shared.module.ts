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
import { PageWideComponent } from './page-wide/page-wide.component';
import { PageFormComponent } from './page-form/page-form.component';
import { CardFormComponent } from './card-form/card-form.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MarginDirective } from './margin.directive';
import { ListItemTitleComponent } from './list-item-title/list-item-title.component';
import { ListItemSubtitleComponent } from './list-item-subtitle/list-item-subtitle.component';

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
    PageWideComponent,
    PageFormComponent,
    CardFormComponent,
    ListComponent,
    ListItemComponent,
    MarginDirective,
    ListItemTitleComponent,
    ListItemSubtitleComponent,
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
    PageWideComponent,
    PageFormComponent,
    CardFormComponent,
    ListComponent,
    ListItemComponent,
    ListItemTitleComponent,
    ListItemSubtitleComponent,
    MarginDirective,
  ],
  entryComponents: [ErrorDialogComponent],
})
export class SharedModule {}
