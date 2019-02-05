import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormNameComponent } from './create-monitor-form-name.component';

describe('CreateMonitorFormNameComponent', () => {
  let component: CreateMonitorFormNameComponent;
  let fixture: ComponentFixture<CreateMonitorFormNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorFormNameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
