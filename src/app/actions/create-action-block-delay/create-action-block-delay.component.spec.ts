import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionBlockDelayComponent } from './create-action-block-delay.component';

describe('CreateActionBlockDelayComponent', () => {
  let component: CreateActionBlockDelayComponent;
  let fixture: ComponentFixture<CreateActionBlockDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionBlockDelayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionBlockDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
