import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionEmailSendLimitComponent } from './create-action-email-send-limit.component';

describe('CreateActionEmailSendLimitComponent', () => {
  let component: CreateActionEmailSendLimitComponent;
  let fixture: ComponentFixture<CreateActionEmailSendLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionEmailSendLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionEmailSendLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
