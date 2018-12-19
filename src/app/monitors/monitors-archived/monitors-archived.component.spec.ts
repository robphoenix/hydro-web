import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsArchivedComponent } from './monitors-archived.component';

describe('MonitorsArchivedComponent', () => {
  let component: MonitorsArchivedComponent;
  let fixture: ComponentFixture<MonitorsArchivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorsArchivedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
