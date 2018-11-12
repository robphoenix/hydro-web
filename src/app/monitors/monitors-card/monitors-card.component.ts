import { Component, OnInit, Input } from '@angular/core';
import { IMonitor } from '../monitor';

@Component({
  selector: 'app-monitors-card',
  templateUrl: './monitors-card.component.html',
  styleUrls: ['./monitors-card.component.scss'],
})
export class MonitorsCardComponent implements OnInit {
  @Input()
  monitor: IMonitor;

  constructor() {}

  ngOnInit() {}
}
