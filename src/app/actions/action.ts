export interface IAction {
  id: number;
  name: string;
  group: ActionGroup;
  description: string;
  address: string;
  metadata: IActionMetadataBlock | IActionMetadataEmail;
  archived: boolean;
}

export enum ActionGroup {
  Block = 'block',
  Email = 'email',
  Store = 'store',
}

export interface IActionMetadataBlock {
  blockTime: number;
  blockTimeUnit: ActionBlockTimeUnit;
  blockDelay: number;
  blockDelayUnit: ActionBlockDelayUnit;
  parameters: ActionParameters[];
}

export enum ActionBlockTimeUnit {
  Minutes = 'MINUTES',
  Hours = 'HOURS',
  Days = 'DAYS',
}

export enum ActionBlockDelayUnit {
  Seconds = 'SECONDS',
  Minutes = 'MINUTES',
  Hours = 'HOURS',
}

export interface IActionMetadataEmail {
  type: string;
  emailText: string;
  emailSubject: string;
  emailAddresses: string;
}

export enum ActionParameters {
  Sip = 'IP Address',
  IpRange = 'IP Range',
  Stk = 'Session token',
  Rstk = 'Response Session Token',
  Uqid = 'UQ ID',
  Uname = 'User Name',
  UserAgent = 'User Agent',
  XForwardedFor = 'X-Forwarded-For',
}

export enum ActionEmailTypes {
  Rate = 'Rate',
  Batch = 'Batch',
  Alert = 'Alert',
}
