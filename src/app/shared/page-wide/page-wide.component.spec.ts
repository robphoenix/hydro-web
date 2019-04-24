import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWideComponent } from './page-wide.component';

describe('PageWideComponent', () => {
  let component: PageWideComponent;
  let fixture: ComponentFixture<PageWideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
