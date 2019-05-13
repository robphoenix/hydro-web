import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitorsStatusToggleComponent } from './view-monitors-status-toggle.component';

describe('ViewMonitorsStatusToggleComponent', () => {
  let component: ViewMonitorsStatusToggleComponent;
  let fixture: ComponentFixture<ViewMonitorsStatusToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMonitorsStatusToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorsStatusToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
