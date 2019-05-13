import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonitorCategoryAddComponent } from './create-monitor-category-add.component';

describe('CreateMonitorCategoryAddComponent', () => {
  let component: CreateMonitorCategoryAddComponent;
  let fixture: ComponentFixture<CreateMonitorCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMonitorCategoryAddComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMonitorCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
