import { SearchModule } from './search/search.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MonitorsModule } from './monitors/monitors.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './user/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { ErrorInterceptor } from './error.interceptor';
import { TempModule } from './temp/temp.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    // hydro
    LayoutModule,
    UserModule,
    MonitorsModule,
    SearchModule,
    // TODO: please remember to delete this module
    TempModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
