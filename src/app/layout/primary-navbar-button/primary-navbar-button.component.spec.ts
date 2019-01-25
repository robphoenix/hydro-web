import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryNavbarButtonComponent } from './primary-navbar-button.component';

describe('PrimaryNavbarButtonComponent', () => {
  let component: PrimaryNavbarButtonComponent;
  let fixture: ComponentFixture<PrimaryNavbarButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryNavbarButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryNavbarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
