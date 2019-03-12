export interface IMonitorData {
  type: string;
  address: string;
  body: IMonitorDataBody;
}

export interface IMonitorDataBody {
  mn: string; // monitor name
  h: IMonitorDataHeader[]; // headers
  d: Array<Array<MonitorDataAttribute>>; // data
  ts: number; // timestamp
}

export interface IMonitorDataHeader {
  n: string; // name
  t?: string; // type
  f?: string; // format (mostly for time/data types)
}

export interface IMonitorDataAttributes {
  [key: string]: MonitorDataAttribute;
}

export type MonitorDataAttribute = boolean | number | string;

export interface IHeadersMetadata {
  [name: string]: { type: string; format: string };
}

// this represents the data after it has been received and processed and is
// ready for displaying in the data table
export interface IMonitorDisplayData {
  headers: string[];
  headersMetadata: IHeadersMetadata; // any relevant type/format info
  data: IMonitorDataAttributes[];
}
