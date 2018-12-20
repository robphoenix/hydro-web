import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormEplqueryComponent } from './create-monitor-form-eplquery.component';

describe('CreateMonitorFormEplqueryComponent', () => {
  let component: CreateMonitorFormEplqueryComponent;
  let fixture: ComponentFixture<CreateMonitorFormEplqueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMonitorFormEplqueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormEplqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
