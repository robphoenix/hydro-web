import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMonitorsMenuComponent } from './navbar-monitors-menu.component';

describe('NavbarMonitorsMenuComponent', () => {
  let component: NavbarMonitorsMenuComponent;
  let fixture: ComponentFixture<NavbarMonitorsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarMonitorsMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMonitorsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
