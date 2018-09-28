import { GeolocationData } from './../../../search-data';
import { Component, OnInit, Input } from '@angular/core';
import { ParameterType } from '../../../../shared/parameterType';

@Component({
  selector: 'app-geolocation-data',
  templateUrl: './geolocation-data.component.html',
  styleUrls: ['./geolocation-data.component.scss']
})
export class GeolocationDataComponent implements OnInit {
  @Input()
  value: string;
  @Input()
  type: ParameterType;
  @Input()
  geolocationData: GeolocationData;

  constructor() {}

  ngOnInit() {}
}
