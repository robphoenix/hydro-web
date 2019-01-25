import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-action-form-section-block',
  templateUrl: './create-action-form-section-block.component.html',
  styleUrls: ['./create-action-form-section-block.component.scss'],
})
export class CreateActionFormSectionBlockComponent implements OnInit {
  blockItems: string[] = [
    'IP Address',
    'IP Range',
    'User Agent',
    'XForwardedFor',
    'UQID',
    'STK',
  ];
  selected: string;

  durationLength = 0;
  durationType: string;
  delayLength = 0;
  delayType: string;
  permanently = false;

  blockPermanently() {
    this.permanently = true;
  }

  constructor() {}

  ngOnInit() {}
}
