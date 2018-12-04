import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDetailsFormComponent } from './monitor-details-form.component';

describe('MonitorDetailsFormComponent', () => {
  let component: MonitorDetailsFormComponent;
  let fixture: ComponentFixture<MonitorDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
