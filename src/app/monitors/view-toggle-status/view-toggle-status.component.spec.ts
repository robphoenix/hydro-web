import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewToggleStatusComponent } from './view-toggle-status.component';

describe('ViewToggleStatusComponent', () => {
  let component: ViewToggleStatusComponent;
  let fixture: ComponentFixture<ViewToggleStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewToggleStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToggleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
