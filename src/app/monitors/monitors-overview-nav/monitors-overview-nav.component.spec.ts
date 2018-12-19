import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsOverviewNavComponent } from './monitors-overview-nav.component';

describe('MonitorsOverviewNavComponent', () => {
  let component: MonitorsOverviewNavComponent;
  let fixture: ComponentFixture<MonitorsOverviewNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsOverviewNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsOverviewNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
