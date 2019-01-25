import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-action-form',
  templateUrl: './create-action-form.component.html',
  styleUrls: ['./create-action-form.component.scss'],
})
export class CreateActionFormComponent implements OnInit {
  @Input()
  title: string;

  constructor() {}

  ngOnInit() {}
}
