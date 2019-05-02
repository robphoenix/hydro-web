import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionBlockDurationComponent } from './create-action-block-duration.component';

describe('CreateActionBlockDurationComponent', () => {
  let component: CreateActionBlockDurationComponent;
  let fixture: ComponentFixture<CreateActionBlockDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionBlockDurationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionBlockDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
