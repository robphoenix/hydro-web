import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EplQueryDialogComponent } from './epl-query-dialog.component';

describe('EplQueryDialogComponent', () => {
  let component: EplQueryDialogComponent;
  let fixture: ComponentFixture<EplQueryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EplQueryDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EplQueryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
