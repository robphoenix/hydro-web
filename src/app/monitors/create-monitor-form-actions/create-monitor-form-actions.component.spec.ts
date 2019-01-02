import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormActionsComponent } from './create-monitor-form-actions.component';

describe('CreateMonitorFormActionsComponent', () => {
  let component: CreateMonitorFormActionsComponent;
  let fixture: ComponentFixture<CreateMonitorFormActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
