import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCategoriesFormgroupComponent } from './monitor-categories-formgroup.component';

describe('MonitorCategoriesFormgroupComponent', () => {
  let component: MonitorCategoriesFormgroupComponent;
  let fixture: ComponentFixture<MonitorCategoriesFormgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorCategoriesFormgroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCategoriesFormgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
