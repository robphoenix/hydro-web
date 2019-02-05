import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormTypeComponent } from './create-monitor-form-type.component';

describe('CreateMonitorFormTypeComponent', () => {
  let component: CreateMonitorFormTypeComponent;
  let fixture: ComponentFixture<CreateMonitorFormTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
