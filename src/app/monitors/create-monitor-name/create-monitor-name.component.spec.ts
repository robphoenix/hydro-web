import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorNameComponent } from './create-monitor-name.component';

describe('CreateMonitorNameComponent', () => {
  let component: CreateMonitorNameComponent;
  let fixture: ComponentFixture<CreateMonitorNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorNameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
