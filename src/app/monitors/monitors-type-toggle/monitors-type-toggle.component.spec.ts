import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsTypeToggleComponent } from './monitors-type-toggle.component';

describe('MonitorsTypeToggleComponent', () => {
  let component: MonitorsTypeToggleComponent;
  let fixture: ComponentFixture<MonitorsTypeToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsTypeToggleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsTypeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
