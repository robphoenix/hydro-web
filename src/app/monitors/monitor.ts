export interface IMonitor {
  id: string;
  topic: string;
  queryBody: string;
  queryDescription: string;
  dateCreated: Date;
  categories: Category[];
  data: IMonitorData;
}

export interface Category {
  id: string;
  value: string;
  dateCreated: Date;
}

/**
 * Describes the monitor data.
 *
 * @export
 * @interface MonitorData
 */
export interface IMonitorData {
  id: string;
  esperItems: Array<EsperItem[]>;
  headers: string[];
  timeStamp: Date;
}

/**
 * Describes the monitor's esper items,
 * this is the main set of variable data
 * that will be displayed.
 *
 * @export
 * @interface EsperItem
 */
export interface EsperItem {
  key: string;
  value: string;
}
