import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionUpdateDialogComponent } from './action-update-dialog.component';

describe('ActionUpdateDialogComponent', () => {
  let component: ActionUpdateDialogComponent;
  let fixture: ComponentFixture<ActionUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionUpdateDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
