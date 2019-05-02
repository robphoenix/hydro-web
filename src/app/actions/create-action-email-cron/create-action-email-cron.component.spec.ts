import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionEmailCronComponent } from './create-action-email-cron.component';

describe('CreateActionEmailCronComponent', () => {
  let component: CreateActionEmailCronComponent;
  let fixture: ComponentFixture<CreateActionEmailCronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionEmailCronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionEmailCronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
