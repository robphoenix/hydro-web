import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { MonitorsModule } from './monitors/monitors.module';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, LayoutHeaderComponent],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    MonitorsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
