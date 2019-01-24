import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarActionsMenuComponent } from './navbar-actions-menu.component';

describe('NavbarActionsMenuComponent', () => {
  let component: NavbarActionsMenuComponent;
  let fixture: ComponentFixture<NavbarActionsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarActionsMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
