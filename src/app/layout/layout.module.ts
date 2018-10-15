import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HydroMaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, RouterModule, HydroMaterialModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class LayoutModule {}
