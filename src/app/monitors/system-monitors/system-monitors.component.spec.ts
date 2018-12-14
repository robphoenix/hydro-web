import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMonitorsComponent } from './system-monitors.component';

describe('SystemMonitorsComponent', () => {
  let component: SystemMonitorsComponent;
  let fixture: ComponentFixture<SystemMonitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMonitorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMonitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
