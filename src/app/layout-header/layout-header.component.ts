import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  logo = `../assets/img/hydro_logo_white.png`;

  constructor() {}

  ngOnInit() {}
}
