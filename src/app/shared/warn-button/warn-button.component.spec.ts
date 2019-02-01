import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnButtonComponent } from './warn-button.component';

describe('WarnButtonComponent', () => {
  let component: WarnButtonComponent;
  let fixture: ComponentFixture<WarnButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarnButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
