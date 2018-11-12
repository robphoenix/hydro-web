export interface IMonitor {
  id: string;
  topic: string;
  queryBody: string;
  queryDescription: string;
  dateCreated: Date;
  categories: ICategory[];
  data: IMonitorData;
  groups: IGroup[];
  actions: IAction[];
}

export interface ICategory {
  id: string;
  value: string;
  dateCreated: Date;
}

export interface IGroup {
  id: string;
  name: string;
}

export interface IAction {
  id: string;
  name: string;
}

/**
 * Describes the monitor data.
 *
 * @export
 * @interface MonitorData
 */
export interface IMonitorData {
  id: string;
  esperItems: Array<IEsperItem[]>;
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
export interface IEsperItem {
  key: string;
  value: string;
}
