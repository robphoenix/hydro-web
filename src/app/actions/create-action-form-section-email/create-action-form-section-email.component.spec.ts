import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionFormSectionEmailComponent } from './create-action-form-section-email.component';

describe('CreateActionFormSectionEmailComponent', () => {
  let component: CreateActionFormSectionEmailComponent;
  let fixture: ComponentFixture<CreateActionFormSectionEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionFormSectionEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionFormSectionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
