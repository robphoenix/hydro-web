import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCategoriesComponent } from './cell-categories.component';

describe('CellCategoriesComponent', () => {
  let component: CellCategoriesComponent;
  let fixture: ComponentFixture<CellCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
