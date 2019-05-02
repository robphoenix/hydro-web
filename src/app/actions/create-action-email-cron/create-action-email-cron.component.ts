import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-email-cron',
  templateUrl: './create-action-email-cron.component.html',
  styleUrls: ['./create-action-email-cron.component.scss'],
})
export class CreateActionEmailCronComponent implements OnInit {
  validationMessage = `You must specify an email cron expression`;

  @Input()
  parent: FormGroup;

  public get hasError(): boolean {
    return this.parent.get(`emailCron`).hasError(`required`);
  }

  constructor() {}

  ngOnInit() {}
}
