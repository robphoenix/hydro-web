import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionType } from '../action';

@Component({
  selector: 'hydro-create-action-type',
  templateUrl: './create-action-type.component.html',
  styleUrls: ['./create-action-type.component.scss'],
})
export class CreateActionTypeComponent implements OnInit {
  private actionType: typeof ActionType = ActionType;
  public actionTypeNames: string[] = [];

  @Input()
  parent: FormGroup;

  public explanations: { [key: string]: string } = {
    // tslint:disable-next-line:max-line-length
    block: `The properties you define below will be used to block an individual entity such as an IP or Session Token`,
    // tslint:disable-next-line:max-line-length
    emailAlert: `The properties you define below will be used to send out an email for every esper event. Once an alert value such as an IP (eg 1.1.1.1) or session token has been sent then it, and all other data in the same row, will be ignored for four days and any future emails will not reference it even though it was part of an esper event.`,
    // tslint:disable-next-line:max-line-length
    emailBatch: `The properties you define below will be used to batch esper events into email sent every day at the time specified`,
    // tslint:disable-next-line:max-line-length
    emailRate: `The properties you define below will be used to send out emails at a maximum number per hour`,
    // tslint:disable-next-line:max-line-length
    storeDB: `This needs to be rewritten. Selecting this option indicates that the receiver of this message will the esper-results-node and will store the esper event data in the DB. If this option is selected, then the 'storing' tick will be displayed on the main screen irrespective of the actual action taken.
You have selected 'database' callout type. This means that this callout will be storing esper results into the Postgres database.`,
    storeLogins: `You'll have to ask Roger what this does`,
    storeAnalysis: `You'll have to ask Roger what this does`,
    misc: `This is miscellaneous callout type, with no additional properties.`,
  };

  public displayNames: { [key: string]: string } = {
    block: `Block`,
    emailRate: `Email Rate`,
    emailBatch: `Email Batch`,
    emailAlert: `Email Alert`,
    storeDB: `Store in Database`,
    storeLogins: `Store Logins`,
    storeAnalysis: `Store Analysis`,
    misc: `Miscellaneous`,
  };

  ngOnInit() {
    this.actionTypeNames = Object.values(this.actionType);
  }

  public get actionTypeValue(): string {
    return this.parent.get('actionType').value;
  }
}
