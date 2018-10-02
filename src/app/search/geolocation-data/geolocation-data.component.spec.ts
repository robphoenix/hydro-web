import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationDataComponent } from './geolocation-data.component';

describe('GeolocationDataComponent', () => {
  let component: GeolocationDataComponent;
  let fixture: ComponentFixture<GeolocationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
