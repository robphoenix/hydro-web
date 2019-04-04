export interface IActions {
  id: number;
  name: string;
  group: string;
  description: string;
  address: string;
  metadata: IActionsMetadataBlock | IActionsMetadataEmail;
  archived: boolean;
}

export interface IActionsMetadataBlock {
  type: string;
  blockTime: number;
  blockTimeUnit: string;
  blockDelay: number;
  blockDelayUnit: string;
  blockParameters: string[];
}

export enum ActionsBlockType {
  SimpleBlock = 'simpleBlock',
}

export interface IActionsMetadataEmail {
  type: string;
  emailText: string;
  emailSubject: string;
  emailAdresses: string;
  emailAlertFields: string;
}

export enum BlockParameters {
  Sip = 'IP Address',
  IpRange = 'IP Range',
  Stk = 'Session token',
  Rstk = 'Response Session Token',
  Uqid = 'UQ ID',
  Uname = 'User Name',
  UserAgent = 'User Agent',
  XForwardedFor = 'X-Forwarded-For',
}
