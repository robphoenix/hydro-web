import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccentLinkButtonComponent } from './accent-link-button.component';

describe('AccentLinkButtonComponent', () => {
  let component: AccentLinkButtonComponent;
  let fixture: ComponentFixture<AccentLinkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccentLinkButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccentLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
