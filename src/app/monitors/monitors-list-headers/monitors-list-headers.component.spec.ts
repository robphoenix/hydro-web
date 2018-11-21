import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsListHeadersComponent } from './monitors-list-headers.component';

describe('MonitorsListHeadersComponent', () => {
  let component: MonitorsListHeadersComponent;
  let fixture: ComponentFixture<MonitorsListHeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsListHeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsListHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
