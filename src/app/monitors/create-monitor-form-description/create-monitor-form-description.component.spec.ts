import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormDescriptionComponent } from './create-monitor-form-description.component';

describe('CreateMonitorFormDescriptionComponent', () => {
  let component: CreateMonitorFormDescriptionComponent;
  let fixture: ComponentFixture<CreateMonitorFormDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorFormDescriptionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
