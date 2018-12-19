import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormComponent } from './create-monitor-form.component';

describe('CreateMonitorFormComponent', () => {
  let component: CreateMonitorFormComponent;
  let fixture: ComponentFixture<CreateMonitorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
