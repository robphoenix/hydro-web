export interface IMonitor {
  actionGroups: IActionGroup[];
  categories: ICategory[];
  data: IMonitorData;
  dateCreated: Date;
  expires: Date;
  groups: IGroup[];
  id: string;
  queryBody: string;
  queryDescription: string;
  topic: string;
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

export interface IActionGroup {
  name: Group;
  actions: IAction[];
}

export interface IAction {
  id: string;
  name: string;
}

enum Group {
  Email = 'email',
  Block = 'block',
  Save = 'save',
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
