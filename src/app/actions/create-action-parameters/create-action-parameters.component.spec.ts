import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionParametersComponent } from './create-action-parameters.component';

describe('CreateActionParametersComponent', () => {
  let component: CreateActionParametersComponent;
  let fixture: ComponentFixture<CreateActionParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
