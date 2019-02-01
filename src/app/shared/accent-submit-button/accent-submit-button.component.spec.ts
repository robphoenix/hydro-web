import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccentSubmitButtonComponent } from './accent-submit-button.component';

describe('AccentSubmitButtonComponent', () => {
  let component: AccentSubmitButtonComponent;
  let fixture: ComponentFixture<AccentSubmitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccentSubmitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccentSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
