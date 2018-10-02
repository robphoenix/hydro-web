import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryHelpDialogComponent } from './dictionary-help-dialog.component';

describe('DictionaryHelpDialogComponent', () => {
  let component: DictionaryHelpDialogComponent;
  let fixture: ComponentFixture<DictionaryHelpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DictionaryHelpDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
