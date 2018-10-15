import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryResultComponent } from './dictionary-result.component';
import { GeolocationDataComponent } from '../geolocation-data/geolocation-data.component';
import { HydroMaterialModule } from '../../material/material.module';
import { BlockHistoryComponent } from '../block-history/block-history.component';
import { CrossReferenceComponent } from '../cross-reference/cross-reference.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DictionaryResultComponent', () => {
  let component: DictionaryResultComponent;
  let fixture: ComponentFixture<DictionaryResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HydroMaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [
        DictionaryResultComponent,
        GeolocationDataComponent,
        BlockHistoryComponent,
        CrossReferenceComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
