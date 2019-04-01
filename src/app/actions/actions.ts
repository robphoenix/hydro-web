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

SIP('IP Address'),
  IP_RANGE('IP Range'),
  STK('Session token'),
  RSTK('Response Session Token'),
  UQID('UQ ID'),
  UNAME('User Name'),
  userAgent('User Agent'),
  xForwardedFor('X-Forwarded-For'),
  NONE('None');
