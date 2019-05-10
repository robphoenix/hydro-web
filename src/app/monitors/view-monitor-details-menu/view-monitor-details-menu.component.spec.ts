import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitorDetailsMenuComponent } from './view-monitor-details-menu.component';

describe('ViewMonitorDetailsMenuComponent', () => {
  let component: ViewMonitorDetailsMenuComponent;
  let fixture: ComponentFixture<ViewMonitorDetailsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMonitorDetailsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
