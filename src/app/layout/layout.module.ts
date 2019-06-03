import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HydroMaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { LogotypeLinkComponent } from './logotype-link/logotype-link.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, HydroMaterialModule],
  exports: [NavbarComponent, FooterComponent],
  declarations: [NavbarComponent, LogotypeLinkComponent, FooterComponent],
})
export class LayoutModule {}
