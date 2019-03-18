export interface IMonitorData {
  type: string;
  address: string;
  body: IMonitorDataBody | MonitorStatusChange;
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

export enum MonitorDataAttributeType {
  Ip = 'ip',
  DateTime = 'dateTime',
}

export enum MonitorStatusChange {
  Removed = 'removed', // this monitor was just removed from the monitor cache, which means it got archived;
  Online = 'online', // this monitor just got its status changed to online;
  Offline = 'offline', // this monitor just got its status changed to online;
  EplUpdated = 'eplUpdated', // the EPL query for this monitor was updated;
  CacheWindowChanged = 'cacheWindowChanged', // the cache window for this monitor was updated.
}
