import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActionsListItemComponent } from './view-actions-list-item.component';

describe('ViewActionsListItemComponent', () => {
  let component: ViewActionsListItemComponent;
  let fixture: ComponentFixture<ViewActionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewActionsListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
