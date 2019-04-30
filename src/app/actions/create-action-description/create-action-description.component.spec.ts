import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionDescriptionComponent } from './create-action-description.component';

describe('CreateActionDescriptionComponent', () => {
  let component: CreateActionDescriptionComponent;
  let fixture: ComponentFixture<CreateActionDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
