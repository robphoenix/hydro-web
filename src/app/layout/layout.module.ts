import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HydroMaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMonitorsMenuComponent } from './navbar-monitors-menu/navbar-monitors-menu.component';
import { NavbarUserMenuComponent } from './navbar-user-menu/navbar-user-menu.component';
import { NavbarActionsMenuComponent } from './navbar-actions-menu/navbar-actions-menu.component';
import { PrimaryNavbarButtonComponent } from './primary-navbar-button/primary-navbar-button.component';
import { SharedModule } from '../shared/shared.module';
import { LogotypeLinkComponent } from './logotype-link/logotype-link.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, HydroMaterialModule],
  exports: [NavbarComponent],
  declarations: [
    NavbarComponent,
    NavbarMonitorsMenuComponent,
    NavbarUserMenuComponent,
    NavbarActionsMenuComponent,
    PrimaryNavbarButtonComponent,
    LogotypeLinkComponent,
  ],
})
export class LayoutModule {}
