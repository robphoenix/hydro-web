import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorTableComponent } from './monitor-table.component';
import { HydroMaterialModule } from '../../material/material.module';

describe('MonitorTableComponent', () => {
  let component: MonitorTableComponent;
  let fixture: ComponentFixture<MonitorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HydroMaterialModule],
      declarations: [MonitorTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
