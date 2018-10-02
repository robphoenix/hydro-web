import { IGeolocationData } from './../search-data';
import { Component, OnInit, Input } from '@angular/core';
import { SearchParameter } from '../search-parameter';

@Component({
  selector: 'app-geolocation-data',
  templateUrl: './geolocation-data.component.html',
  styleUrls: ['./geolocation-data.component.scss'],
})
export class GeolocationDataComponent implements OnInit {
  @Input()
  value: string;
  @Input()
  type: SearchParameter;
  @Input()
  geolocationData: IGeolocationData;

  constructor() {}

  ngOnInit() {}
}
