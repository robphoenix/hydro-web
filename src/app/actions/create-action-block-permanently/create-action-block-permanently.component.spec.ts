import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionBlockPermanentlyComponent } from './create-action-block-permanently.component';

describe('CreateActionBlockPermanentlyComponent', () => {
  let component: CreateActionBlockPermanentlyComponent;
  let fixture: ComponentFixture<CreateActionBlockPermanentlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionBlockPermanentlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionBlockPermanentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
