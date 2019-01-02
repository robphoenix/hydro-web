import { Component, OnInit, Input } from '@angular/core';
import { IAction } from '../monitor';

@Component({
  selector: 'app-create-monitor-form-actions',
  templateUrl: './create-monitor-form-actions.component.html',
  styleUrls: ['./create-monitor-form-actions.component.scss'],
})
export class CreateMonitorFormActionsComponent implements OnInit {
  @Input()
  availableActions: { [group: string]: IAction[] };

  icons: { [group: string]: string } = {
    block: 'block',
    email: 'email_outline',
    store: 'check',
    other: 'subject',
  };

  constructor() {}

  ngOnInit() {}
}
