export interface IMonitorData {
  address: string;
  body: { messages: IMonitorDataMessage[] };
}

export interface IMonitorDataMessage {
  feedName: string;
  attributes: IMonitorDataAttributes;
}

export interface IMonitorDataAttributes {
  [key: string]: any;
}
