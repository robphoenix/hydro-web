import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorsFormNameComponent } from './create-monitors-form-name.component';

describe('CreateMonitorsFormNameComponent', () => {
  let component: CreateMonitorsFormNameComponent;
  let fixture: ComponentFixture<CreateMonitorsFormNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorsFormNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorsFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
