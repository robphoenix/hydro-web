import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HydroMaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMonitorsMenuComponent } from './navbar-monitors-menu/navbar-monitors-menu.component';
import { NavbarUserMenuComponent } from './navbar-user-menu/navbar-user-menu.component';
import { NavbarActionsMenuComponent } from './navbar-actions-menu/navbar-actions-menu.component';

@NgModule({
  imports: [CommonModule, RouterModule, HydroMaterialModule],
  exports: [NavbarComponent],
  declarations: [
    NavbarComponent,
    NavbarMonitorsMenuComponent,
    NavbarUserMenuComponent,
    NavbarActionsMenuComponent,
  ],
})
export class LayoutModule {}
