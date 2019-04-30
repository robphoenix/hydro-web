import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionSectionEmailComponent } from './create-action-form-section-email.component';

describe('CreateActionSectionEmailComponent', () => {
  let component: CreateActionSectionEmailComponent;
  let fixture: ComponentFixture<CreateActionSectionEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionSectionEmailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionSectionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
