import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionTypeComponent } from './create-action-type.component';

describe('CreateActionTypeComponent', () => {
  let component: CreateActionTypeComponent;
  let fixture: ComponentFixture<CreateActionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
