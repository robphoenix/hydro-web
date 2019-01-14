import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnarchiveMonitorDialogComponent } from './unarchive-monitor-dialog.component';

describe('UnarchiveMonitorDialogComponent', () => {
  let component: UnarchiveMonitorDialogComponent;
  let fixture: ComponentFixture<UnarchiveMonitorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnarchiveMonitorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnarchiveMonitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
