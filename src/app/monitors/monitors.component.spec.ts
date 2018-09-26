import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterPipe } from '../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MonitorSidenavComponent } from './../monitor-sidenav/monitor-sidenav.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorsComponent } from './monitors.component';
import {
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MonitorsListComponent } from '../monitors-list/monitors-list.component';

describe('MonitorsComponent', () => {
  let component: MonitorsComponent;
  let fixture: ComponentFixture<MonitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        MonitorsComponent,
        MonitorSidenavComponent,
        MonitorsListComponent,
        FilterPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
