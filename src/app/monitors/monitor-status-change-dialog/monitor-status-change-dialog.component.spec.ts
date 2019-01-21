import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorStatusChangeDialogComponent } from './monitor-status-change-dialog.component';

describe('MonitorStatusChangeDialogComponent', () => {
  let component: MonitorStatusChangeDialogComponent;
  let fixture: ComponentFixture<MonitorStatusChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorStatusChangeDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorStatusChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
