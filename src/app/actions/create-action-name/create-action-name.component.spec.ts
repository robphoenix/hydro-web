import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionNameComponent } from './create-action-name.component';

describe('CreateActionNameComponent', () => {
  let component: CreateActionNameComponent;
  let fixture: ComponentFixture<CreateActionNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionNameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
