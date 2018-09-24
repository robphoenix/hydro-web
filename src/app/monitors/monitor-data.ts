export interface MonitorData {
  id: number;
  esperItems: Array<EsperItem[]>;
  headers: string[];
  timeStamp: string;
  hashCode: number;
  noDataFound: boolean;
}

export interface EsperItem {
  key: string;
  value: string;
}
