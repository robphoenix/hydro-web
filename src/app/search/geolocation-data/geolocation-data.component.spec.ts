import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationDataComponent } from './geolocation-data.component';
import { HydroMaterialModule } from '../../material/material.module';

describe('GeolocationDataComponent', () => {
  let component: GeolocationDataComponent;
  let fixture: ComponentFixture<GeolocationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HydroMaterialModule],
      declarations: [GeolocationDataComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
