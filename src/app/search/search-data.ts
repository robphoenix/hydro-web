export interface SearchData {
  blockHistory: BlockHistory[];
  geolocationData: GeolocationData;
  crossReference: CrossReference[];
}

export interface BlockHistory {
  id: number;
  blockAction: string;
  category: string;
  parameter: string;
  createdDate: number;
  topic: string;
  description: string;
  unblockRef: number | null;
  evictionTime: number;
  timeToBlockInMins: number;
  paramType: string;
  username: string;
  weighting: number;
  parameterType: string;
  permanentBlock: boolean;
  evictionTimeInMills: number;
  timeToBlockInMills: number;
  ipAsLong: number;
}

export interface CrossReference {
  'User Name': UserName;
  IP: IP;
  'Session Token': string;
  'User Agent': string;
  Timestamp: string;
  'Login Status': LoginStatus;
}

export enum IP {
  The857494230 = '85.74.94.230'
}

export enum LoginStatus {
  LoginOk = 'Login Ok'
}

export enum UserName {
  Vologia123 = 'vologia123'
}

export interface GeolocationData {
  city: string;
  country: string;
  provider: string;
  blocked: boolean;
  whitelisted: boolean;
  hosting: boolean;
}
