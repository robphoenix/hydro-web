import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsStandardComponent } from './monitors-standard.component';

describe('MonitorsStandardComponent', () => {
  let component: MonitorsStandardComponent;
  let fixture: ComponentFixture<MonitorsStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
