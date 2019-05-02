import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionEmailTextComponent } from './create-action-email-text.component';

describe('CreateActionEmailTextComponent', () => {
  let component: CreateActionEmailTextComponent;
  let fixture: ComponentFixture<CreateActionEmailTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionEmailTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionEmailTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
