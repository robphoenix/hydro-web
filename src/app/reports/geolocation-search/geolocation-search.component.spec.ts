import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationSearchComponent } from './geolocation-search.component';

describe('GeolocationSearchComponent', () => {
  let component: GeolocationSearchComponent;
  let fixture: ComponentFixture<GeolocationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
