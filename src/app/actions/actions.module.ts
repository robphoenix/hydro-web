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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: 'add', component: AddActionComponent }]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HydroMaterialModule,
  ],
  declarations: [CreateActionFormComponent, AddActionComponent, CreateActionFormSectionBlockComponent, CreateActionFormSectionEmailComponent, CreateActionFormSectionOtherComponent],
})
export class ActionsModule {}
