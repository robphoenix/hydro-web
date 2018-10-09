/**
 * Describes the monitor data.
 *
 * @export
 * @interface MonitorData
 */
export interface MonitorData {
  id: number;
  esperItems: Array<EsperItem[]>;
  headers: string[];
  timeStamp: string;
  hashCode: number;
  noDataFound: boolean;
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
