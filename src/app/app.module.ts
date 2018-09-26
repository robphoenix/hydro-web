import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSliderModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { HttpClientModule } from '@angular/common/http';
import { MonitorSidenavComponent } from './monitor-sidenav/monitor-sidenav.component';
import { MonitorComponent } from './monitor/monitor.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    MonitorsComponent,
    MonitorSidenavComponent,
    MonitorComponent,
    FilterPipe,
    MonitorsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatExpansionModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
