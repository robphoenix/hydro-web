import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNarrowComponent } from './page-narrow.component';

describe('PageNarrowComponent', () => {
  let component: PageNarrowComponent;
  let fixture: ComponentFixture<PageNarrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNarrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNarrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
