import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorsComponent } from './monitors.component';
import {
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MonitorsListComponent } from '../monitors-list/monitors-list.component';
import { HydroMaterialModule } from 'src/app/material/material.module';
import { FilterMonitorsPipe } from '../filter-monitors.pipe';

describe('MonitorsComponent', () => {
  let component: MonitorsComponent;
  let fixture: ComponentFixture<MonitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HydroMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        MonitorsComponent,
        MonitorsListComponent,
        FilterMonitorsPipe,
      ],
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
