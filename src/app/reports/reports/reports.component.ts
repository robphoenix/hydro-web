import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  title = 'Reports';

  dictionaryTitle = 'Dictionary Search';
  geolocationTitle = 'Geolocation Look Up';

  constructor() {}

  ngOnInit() {}
}
