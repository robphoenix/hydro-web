import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossReferenceComponent } from './cross-reference.component';
import { HydroMaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CrossReferenceComponent', () => {
  let component: CrossReferenceComponent;
  let fixture: ComponentFixture<CrossReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HydroMaterialModule, NoopAnimationsModule],
      declarations: [CrossReferenceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
