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