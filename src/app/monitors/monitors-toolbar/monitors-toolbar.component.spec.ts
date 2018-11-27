import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsToolbarComponent } from './monitors-toolbar.component';

describe('MonitorsToolbarComponent', () => {
  let component: MonitorsToolbarComponent;
  let fixture: ComponentFixture<MonitorsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
