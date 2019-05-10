import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitorDetailsComponent } from './view-monitor-details.component';

describe('ViewMonitorDetailsComponent', () => {
  let component: ViewMonitorDetailsComponent;
  let fixture: ComponentFixture<ViewMonitorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMonitorDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
