import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionFormSectionBlockComponent } from './create-action-form-section-block.component';

describe('CreateActionFormSectionBlockComponent', () => {
  let component: CreateActionFormSectionBlockComponent;
  let fixture: ComponentFixture<CreateActionFormSectionBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionFormSectionBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionFormSectionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
