import { ParameterType } from './../../shared/parameterType';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-options',
  templateUrl: './reports-options.component.html',
  styleUrls: ['./reports-options.component.scss']
})
export class ReportsOptionsComponent implements OnInit {
  @Input()
  title: string;

  ParameterType = ParameterType;

  constructor() {}

  ngOnInit() {}
}
