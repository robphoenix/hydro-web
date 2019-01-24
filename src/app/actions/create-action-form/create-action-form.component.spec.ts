import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionFormComponent } from './create-action-form.component';

describe('CreateActionFormComponent', () => {
  let component: CreateActionFormComponent;
  let fixture: ComponentFixture<CreateActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
