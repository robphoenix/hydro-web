import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitorsTypeComponent } from './view-monitors-type.component';

describe('ViewMonitorsTypeComponent', () => {
  let component: ViewMonitorsTypeComponent;
  let fixture: ComponentFixture<ViewMonitorsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMonitorsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
