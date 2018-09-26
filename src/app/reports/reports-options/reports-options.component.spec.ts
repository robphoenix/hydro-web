import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsOptionsComponent } from './reports-options.component';

describe('ReportsOptionsComponent', () => {
  let component: ReportsOptionsComponent;
  let fixture: ComponentFixture<ReportsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
