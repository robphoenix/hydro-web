import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonitorComponent } from './edit-monitor.component';

describe('EditMonitorComponent', () => {
  let component: EditMonitorComponent;
  let fixture: ComponentFixture<EditMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
