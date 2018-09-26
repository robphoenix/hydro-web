import { FilterPipe } from '../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorSidenavComponent } from './monitor-sidenav.component';
import { MonitorsListComponent } from '../monitors-list/monitors-list.component';
import {
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MonitorSidenavComponent', () => {
  let component: MonitorSidenavComponent;
  let fixture: ComponentFixture<MonitorSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        RouterModule,
        BrowserAnimationsModule
      ],
      declarations: [MonitorSidenavComponent, MonitorsListComponent, FilterPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
