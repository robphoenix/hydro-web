import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorErrorDialogComponent } from './create-monitor-error-dialog.component';

describe('CreateMonitorErrorDialogComponent', () => {
  let component: CreateMonitorErrorDialogComponent;
  let fixture: ComponentFixture<CreateMonitorErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorErrorDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
