import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryResultComponent } from './dictionary-result.component';

describe('DictionaryResultComponent', () => {
  let component: DictionaryResultComponent;
  let fixture: ComponentFixture<DictionaryResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
