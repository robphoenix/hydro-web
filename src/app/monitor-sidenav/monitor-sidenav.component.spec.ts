import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSidenavComponent } from './monitor-sidenav.component';

describe('MonitorSidenavComponent', () => {
  let component: MonitorSidenavComponent;
  let fixture: ComponentFixture<MonitorSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
