import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellMonitorComponent } from './cell-monitor.component';

describe('CellMonitorComponent', () => {
  let component: CellMonitorComponent;
  let fixture: ComponentFixture<CellMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CellMonitorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
