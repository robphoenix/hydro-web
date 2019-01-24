import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActionFormComponent } from './create-action-form/create-action-form.component';
import { AddActionComponent } from './add-action/add-action.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HydroMaterialModule } from '../material/material.module';

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
  declarations: [CreateActionFormComponent, AddActionComponent],
})
export class ActionsModule {}
