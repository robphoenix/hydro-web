import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormStatusComponent } from './create-monitor-form-status.component';

describe('CreateMonitorFormStatusComponent', () => {
  let component: CreateMonitorFormStatusComponent;
  let fixture: ComponentFixture<CreateMonitorFormStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
