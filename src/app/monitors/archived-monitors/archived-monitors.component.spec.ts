import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedMonitorsComponent } from './archived-monitors.component';

describe('ArchivedMonitorsComponent', () => {
  let component: ArchivedMonitorsComponent;
  let fixture: ComponentFixture<ArchivedMonitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedMonitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedMonitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
