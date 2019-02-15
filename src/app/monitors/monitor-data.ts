export interface IMonitorData {
  type: string;
  address: string;
  body: IMonitorDataBody;
}

// export interface IMonitorDataBody {
//   monitorName: string;
//   headers: IMonitorDataHeaders[];
//   data: Array<Array<boolean | number | string>>;
//   timestamp: number;
// }

// export class MonitorDataBodyBandwidthSaver implements IMonitorDataBody {
//   //  These properties are used by the JS JSON parser to get the values
//   mn: string; // monitor name
//   h: IMonitorDataHeaders[]; // headers
//   d: Array<Array<boolean | number | string>>; // data
//   ts: number; // timestamp

//   // This then maps the values to the interface
//   public monitorName = this.mn;
//   public headers = this.h;
//   public data = this.d;
//   public timestamp = this.ts;

//   constructor() {
//     this.headers = this.h;
//   }
// }

export interface IMonitorDataBody {
  mn: string; // monitor name
  h: IMonitorDataHeaders[]; // headers
  d: Array<Array<boolean | number | string>>; // data
  ts: number; // timestamp
}

export interface IMonitorDataHeaders {
  // name: string;
  // type?: string;
  n: string; // name
  t?: string; // type
}
// export class MonitorDataHeadersBandwidthSaver implements IMonitorDataHeaders {
//   n: string; // name
//   t?: string; // type

//   public name = this.n;
//   public type = this.t;
// }

export interface IMonitorDataAttributes {
  [key: string]: boolean | number | string;
}
