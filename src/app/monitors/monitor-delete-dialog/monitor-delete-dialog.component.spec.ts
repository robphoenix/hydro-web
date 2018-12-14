import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDeleteDialogComponent } from './monitor-delete-dialog.component';

describe('MonitorDeleteDialogComponent', () => {
  let component: MonitorDeleteDialogComponent;
  let fixture: ComponentFixture<MonitorDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorDeleteDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
