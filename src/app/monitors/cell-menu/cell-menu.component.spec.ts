import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellMenuComponent } from './cell-menu.component';

describe('CellMenuComponent', () => {
  let component: CellMenuComponent;
  let fixture: ComponentFixture<CellMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CellMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
