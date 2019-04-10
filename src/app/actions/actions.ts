export interface IAction {
  id: number;
  name: string;
  group: ActionGroup;
  description: string;
  address: string;
  metadata: IActionsMetadataBlock | IActionsMetadataEmail;
  archived: boolean;
}

export enum ActionGroup {
  Block = 'block',
  Email = 'email',
  Store = 'store',
}

export interface IActionsMetadataBlock {
  blockTime: number;
  blockTimeUnit: ActionsBlockTimeUnit;
  blockDelay: number;
  blockDelayUnit: ActionsBlockDelayUnit;
  blockParameters: string[];
  parameters: ActionParameters[];
}

export enum ActionsBlockTimeUnit {
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
}

export enum ActionsBlockDelayUnit {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
}

export interface IActionsMetadataEmail {
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
