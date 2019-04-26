export interface IAction {
  id: number;
  name: string;
  actionType: ActionType;
  description: string;
  address: string;
  metadata: IActionMetadataBlock | IActionMetadataEmailRate;
  archived: boolean;
}

export enum ActionType {
  Block = 'block',
  EmailRate = 'emailRate',
  EmailBatch = 'emailBatch',
  EmailAlert = 'emailAlert',
  StoreDB = 'storeDB',
  StoreLogins = 'storeLogins',
  StoreAnalysis = 'storeAnalysis',
  Misc = 'misc',
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

export interface IActionMetadataEmailRate {
  emailText: string;
  emailSubject: string;
  emailAddresses: string;
  emailSendLimit: number;
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
