export interface IMonitorData {
  type: string;
  address: string;
  body: IMonitorDataBody;
}

export interface IMonitorDataBody {
  mn: string; // monitor name
  h: IMonitorDataHeaders[]; // headers
  d: Array<Array<boolean | number | string>>; // data
  ts: number; // timestamp
}

export interface IMonitorDataHeaders {
  n: string; // name
  t?: string; // type
}

export interface IMonitorDataAttributes {
  [key: string]: boolean | number | string;
}
