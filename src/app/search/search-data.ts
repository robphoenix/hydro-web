export interface ISearchData {
  blockHistory: IBlockHistory[];
  geolocationData: IGeolocationData;
  crossReference: ICrossReference[];
}

export interface IBlockHistory {
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

export interface ICrossReference {
  'User Name': string;
  IP: string;
  'Session Token': string;
  'User Agent': string;
  Timestamp: string;
  'Login Status': string;
}

export interface IGeolocationData {
  city: string;
  country: string;
  provider: string;
  blocked: boolean;
  whitelisted: boolean;
  hosting: boolean;
}
