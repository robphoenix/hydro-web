import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monitors-toolbar',
  templateUrl: './monitors-toolbar.component.html',
  styleUrls: ['./monitors-toolbar.component.scss'],
})
export class MonitorsToolbarComponent implements OnInit {
  @Input()
  title: string;

  constructor() {}

  ngOnInit() {}
}
