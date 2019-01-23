import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormPriorityComponent } from './create-monitor-form-priority.component';

describe('CreateMonitorFormPriorityComponent', () => {
  let component: CreateMonitorFormPriorityComponent;
  let fixture: ComponentFixture<CreateMonitorFormPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorFormPriorityComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
