import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell-monitor',
  templateUrl: './cell-monitor.component.html',
  styleUrls: ['./cell-monitor.component.scss'],
})
export class CellMonitorComponent implements OnInit {
  @Input()
  id: number;
  @Input()
  name: string;
  @Input()
  description: string;

  constructor() {}

  ngOnInit() {}
}
