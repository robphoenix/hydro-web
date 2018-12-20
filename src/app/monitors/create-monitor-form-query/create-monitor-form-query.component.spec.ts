import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormQueryComponent } from './create-monitor-form-query.component';

describe('CreateMonitorFormQueryComponent', () => {
  let component: CreateMonitorFormQueryComponent;
  let fixture: ComponentFixture<CreateMonitorFormQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
