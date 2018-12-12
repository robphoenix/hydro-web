import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMonitorsComponent } from './standard-monitors.component';

describe('StandardMonitorsComponent', () => {
  let component: StandardMonitorsComponent;
  let fixture: ComponentFixture<StandardMonitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardMonitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardMonitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
