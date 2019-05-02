import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-email-send-limit',
  templateUrl: './create-action-email-send-limit.component.html',
  styleUrls: ['./create-action-email-send-limit.component.scss'],
})
export class CreateActionEmailSendLimitComponent implements OnInit {
  @Input()
  parent: FormGroup;
  constructor() {}

  ngOnInit() {}
}
