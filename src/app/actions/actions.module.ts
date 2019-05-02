import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActionComponent } from './create-action/create-action.component';
import { AddActionComponent } from './add-action/add-action.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';
import { CreateActionSectionEmailComponent } from './create-action-form-section-email/create-action-form-section-email.component';
import {
  QuillModule,
  QuillConfigInterface,
  QUILL_CONFIG,
} from 'ngx-quill-wrapper';
import { ViewActionsComponent } from './view-actions/view-actions.component';
import { EditActionComponent } from './edit-action/edit-action.component';
import { ActionUpdateDialogComponent } from './action-update-dialog/action-update-dialog.component';
import { CreateActionNameComponent } from './create-action-name/create-action-name.component';
import { CreateActionDescriptionComponent } from './create-action-description/create-action-description.component';
import { CreateActionTypeComponent } from './create-action-type/create-action-type.component';
import { CreateActionParametersComponent } from './create-action-parameters/create-action-parameters.component';
import { CreateActionBlockPermanentlyComponent } from './create-action-block-permanently/create-action-block-permanently.component';
import { CreateActionBlockDurationComponent } from './create-action-block-duration/create-action-block-duration.component';
import { CreateActionBlockDelayComponent } from './create-action-block-delay/create-action-block-delay.component';
import { CreateActionEmailAddressesComponent } from './create-action-email-addresses/create-action-email-addresses.component';
import { CreateActionEmailSubjectComponent } from './create-action-email-subject/create-action-email-subject.component';
import { CreateActionEmailSendLimitComponent } from './create-action-email-send-limit/create-action-email-send-limit.component';

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
  placeholder: 'Please enter your email template here. *Required.',
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ViewActionsComponent },
      { path: 'add', component: AddActionComponent },
      { path: ':id/edit', component: EditActionComponent },
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
    CreateActionComponent,
    AddActionComponent,
    CreateActionSectionEmailComponent,
    ViewActionsComponent,
    EditActionComponent,
    ActionUpdateDialogComponent,
    CreateActionNameComponent,
    CreateActionDescriptionComponent,
    CreateActionTypeComponent,
    CreateActionParametersComponent,
    CreateActionBlockPermanentlyComponent,
    CreateActionBlockDurationComponent,
    CreateActionBlockDelayComponent,
    CreateActionEmailAddressesComponent,
    CreateActionEmailSubjectComponent,
    CreateActionEmailSendLimitComponent,
  ],
  entryComponents: [ActionUpdateDialogComponent],
})
export class ActionsModule {}
