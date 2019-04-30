import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionSectionBlockComponent } from './create-action-form-section-block.component';

describe('CreateActionSectionBlockComponent', () => {
  let component: CreateActionSectionBlockComponent;
  let fixture: ComponentFixture<CreateActionSectionBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionSectionBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionSectionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
