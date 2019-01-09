import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveMonitorDialogComponent } from './archive-monitor-dialog.component';

describe('ArchiveMonitorDialogComponent', () => {
  let component: ArchiveMonitorDialogComponent;
  let fixture: ComponentFixture<ArchiveMonitorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveMonitorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveMonitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
