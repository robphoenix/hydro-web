import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class LayoutModule {}
