import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionFormSectionOtherComponent } from './create-action-form-section-other.component';

describe('CreateActionFormSectionOtherComponent', () => {
  let component: CreateActionFormSectionOtherComponent;
  let fixture: ComponentFixture<CreateActionFormSectionOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionFormSectionOtherComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionFormSectionOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
