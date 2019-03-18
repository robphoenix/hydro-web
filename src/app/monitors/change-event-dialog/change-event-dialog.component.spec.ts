import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEventDialogComponent } from './change-event-dialog.component';

describe('ChangeEventDialogComponent', () => {
  let component: ChangeEventDialogComponent;
  let fixture: ComponentFixture<ChangeEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeEventDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
