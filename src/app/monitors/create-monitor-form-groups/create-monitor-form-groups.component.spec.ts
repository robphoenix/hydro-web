import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormGroupsComponent } from './create-monitor-form-groups.component';

describe('CreateMonitorFormGroupsComponent', () => {
  let component: CreateMonitorFormGroupsComponent;
  let fixture: ComponentFixture<CreateMonitorFormGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
