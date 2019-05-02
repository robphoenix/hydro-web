import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionEmailSubjectComponent } from './create-action-email-subject.component';

describe('CreateActionEmailSubjectComponent', () => {
  let component: CreateActionEmailSubjectComponent;
  let fixture: ComponentFixture<CreateActionEmailSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionEmailSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionEmailSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
