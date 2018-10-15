import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitorComponent } from './monitor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HydroMaterialModule } from '../../material/material.module';
import { MonitorTableComponent } from '../monitor-table/monitor-table.component';

describe('MonitorComponent', () => {
  let component: MonitorComponent;
  let fixture: ComponentFixture<MonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HydroMaterialModule,
      ],
      declarations: [MonitorComponent, MonitorTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
