import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorCategoriesSelectComponent } from './create-monitor-categories-select.component';

describe('CreateMonitorCategoriesSelectComponent', () => {
  let component: CreateMonitorCategoriesSelectComponent;
  let fixture: ComponentFixture<CreateMonitorCategoriesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorCategoriesSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorCategoriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
