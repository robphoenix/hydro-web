import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitorsListItemMenuComponent } from './view-monitors-list-item-menu.component';

describe('ViewMonitorsListItemMenuComponent', () => {
  let component: ViewMonitorsListItemMenuComponent;
  let fixture: ComponentFixture<ViewMonitorsListItemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMonitorsListItemMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonitorsListItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
