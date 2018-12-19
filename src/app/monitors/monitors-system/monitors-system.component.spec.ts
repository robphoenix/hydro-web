import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsSystemComponent } from './monitors-system.component';

describe('MonitorsSystemComponent', () => {
  let component: MonitorsSystemComponent;
  let fixture: ComponentFixture<MonitorsSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsSystemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
