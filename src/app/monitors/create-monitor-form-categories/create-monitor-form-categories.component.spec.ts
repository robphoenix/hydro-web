import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorFormCategoriesComponent } from './create-monitor-form-categories.component';

describe('CreateMonitorFormCategoriesComponent', () => {
  let component: CreateMonitorFormCategoriesComponent;
  let fixture: ComponentFixture<CreateMonitorFormCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorFormCategoriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorFormCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
