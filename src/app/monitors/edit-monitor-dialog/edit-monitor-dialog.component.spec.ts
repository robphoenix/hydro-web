import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonitorDialogComponent } from './edit-monitor-dialog.component';

describe('EditMonitorDialogComponent', () => {
  let component: EditMonitorDialogComponent;
  let fixture: ComponentFixture<EditMonitorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMonitorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
