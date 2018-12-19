import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewNavComponent } from './overview-nav.component';

describe('OverviewNavComponent', () => {
  let component: OverviewNavComponent;
  let fixture: ComponentFixture<OverviewNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewNavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
