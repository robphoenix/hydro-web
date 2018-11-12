import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsCardComponent } from './monitors-card.component';

describe('MonitorsCardComponent', () => {
  let component: MonitorsCardComponent;
  let fixture: ComponentFixture<MonitorsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
