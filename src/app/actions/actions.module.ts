import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActionFormComponent } from './create-action-form/create-action-form.component';
import { AddActionComponent } from './add-action/add-action.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { CreateActionFormSectionBlockComponent } from './create-action-form-section-block/create-action-form-section-block.component';
import { CreateActionFormSectionEmailComponent } from './create-action-form-section-email/create-action-form-section-email.component';
import { CreateActionFormSectionOtherComponent } from './create-action-form-section-other/create-action-form-section-other.component';
import {
  QuillModule,
  QuillConfigInterface,
  QUILL_CONFIG,
} from 'ngx-quill-wrapper';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const DEFAULT_QUILL_CONFIG: QuillConfigInterface = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ size: ['small', false, 'large'] }],
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ indent: '-1' }, { indent: '+1' }],

      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      [{ list: 'bullet' }, { list: 'ordered' }],
      ['link', 'image'],
    ],
  },
  placeholder: 'Please enter your email template here...',
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OverviewPageComponent },
      { path: 'add', component: AddActionComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HydroMaterialModule,
    QuillModule,
  ],
  providers: [
    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG,
    },
  ],
  declarations: [
    CreateActionFormComponent,
    AddActionComponent,
    CreateActionFormSectionBlockComponent,
    CreateActionFormSectionEmailComponent,
    CreateActionFormSectionOtherComponent,
    OverviewPageComponent,
  ],
})
export class ActionsModule {}
