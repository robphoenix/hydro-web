import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateMonitorComponent } from './duplicate-monitor.component';

describe('DuplicateMonitorComponent', () => {
  let component: DuplicateMonitorComponent;
  let fixture: ComponentFixture<DuplicateMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateMonitorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
