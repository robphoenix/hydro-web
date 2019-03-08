export interface IMonitorData {
  type: string;
  address: string;
  body: IMonitorDataBody;
}

export interface IMonitorDataBody {
  mn: string; // monitor name
  h: IMonitorDataHeader[]; // headers
  d: Array<Array<boolean | number | string>>; // data
  ts: number; // timestamp
}

export interface IMonitorDataHeader {
  n: string; // name
  t?: string; // type
}

export interface IMonitorDataAttributes {
  [key: string]: boolean | number | string;
}

// this represents the data after it has been received and processed and is
// ready for displaying in the data table
export interface IMonitorDisplayData {
  headers: string[];
  data: IMonitorDataAttributes[];
}
