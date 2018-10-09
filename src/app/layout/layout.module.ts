import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class LayoutModule {}
