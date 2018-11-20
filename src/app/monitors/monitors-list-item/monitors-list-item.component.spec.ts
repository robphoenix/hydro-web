import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsListItemComponent } from './monitors-list-item.component';

describe('MonitorsListItemComponent', () => {
  let component: MonitorsListItemComponent;
  let fixture: ComponentFixture<MonitorsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
