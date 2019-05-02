import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionEmailAddressesComponent } from './create-action-email-addresses.component';

describe('CreateActionEmailAddressesComponent', () => {
  let component: CreateActionEmailAddressesComponent;
  let fixture: ComponentFixture<CreateActionEmailAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActionEmailAddressesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionEmailAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
