import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedtypesComponent } from './view-feedtypes.component';

describe('ViewFeedtypesComponent', () => {
  let component: ViewFeedtypesComponent;
  let fixture: ComponentFixture<ViewFeedtypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFeedtypesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
