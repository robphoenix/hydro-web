import { AppRoutingModule } from './app-routing.module';
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
import { MonitorsComponent } from './monitors/monitors/monitors.component';
import { HttpClientModule } from '@angular/common/http';
import { MonitorComponent } from './monitors/monitor/monitor.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MonitorsListComponent } from './monitors/monitors-list/monitors-list.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    MonitorsComponent,
    MonitorComponent,
    FilterPipe,
    MonitorsListComponent,
    ReportsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
