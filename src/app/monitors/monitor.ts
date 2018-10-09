/**
 * Describes a monitor.
 *
 * @remark
 * TODO: I'm not going to document everything in this file until we know for sure
 * in what shape the data will come back from the server.
 *
 * @export
 * @interface IMonitor
 */
export interface IMonitor {
  id: number;
  topic: string;
  queryBody: string;
  queryDescription: string;
  live: boolean;
  dateCreated: number;
  editable: boolean;
  weighting: number;
  template: boolean;
  parentId: number;
  cacheWindow: number;
  aggregateParameter: AggregateParameter;
  categories: Category[];
  externalCalloutObjects: ExternalCalloutObject[];
  groups: Group[];
  blocks: boolean;
  sortedCategoryList: Category[];
  store: boolean;
}

export enum AggregateParameter {
  Empty = '',
  Hits = 'hits',
  LoginCount = 'LoginCount',
  NumHits = 'numHits',
}

export interface Category {
  id: number;
  value: string;
  dateCreated: number;
}

export interface ExternalCalloutObject {
  node: Node;
  id: number;
  name: string;
  uri: URI;
  description: string;
  putFields: PutFields;
  extraInfo: string;
  extraInfoMap: { [key: string]: string };
}

export enum Node {
  EsperStore = 'esper-store',
  FmREST = 'fm-rest',
}

export enum PutFields {
  All = 'ALL',
  SIPTopicClientsip = 'sip,topic,clientsip',
  StkTopic = 'stk,topic',
  TopicXForwardedFor = 'topic,xForwardedFor',
}

export enum URI {
  FmREST = 'fm-rest',
  RESTBlockwebservice = '/rest/blockwebservice',
  RESTEmail = '/rest/email',
  Store = '/store',
}

export interface Group {
  id: number;
  name: Name;
  description: string;
  enabled: boolean;
  viewAll: boolean;
  searchHint: SearchHint;
  parent: Name | null;
}

export enum Name {
  AppForensicMonitoringAppPlatform = 'App_Forensic Monitoring App Platform',
  AppForensicMonitoringDevTeam = 'App_Forensic Monitoring Dev Team',
  AppForensicMonitoringDevelopmentUser = 'App_Forensic Monitoring Development User',
  AppForensicMonitoringFraudAnalysis = 'App_Forensic Monitoring Fraud Analysis',
  AppForensicMonitoringITOperations = 'App_Forensic Monitoring IT Operations',
  AppForensicMonitoringManager = 'App_Forensic Monitoring Manager',
  AppForensicMonitoringNetworkEngineering = 'App_Forensic Monitoring Network Engineering',
  AppForensicMonitoringOTS = 'App_Forensic Monitoring OTS',
  AppForensicMonitoringOTSManagers = 'App_Forensic Monitoring OTS Managers',
  AppForensicMonitoringPublisherAbuse = 'App_Forensic Monitoring Publisher Abuse',
}

export enum SearchHint {
  OUBet365 = 'OU=bet365',
}
