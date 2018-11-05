import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HydroMaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, RouterModule, HydroMaterialModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
})
export class LayoutModule {}
