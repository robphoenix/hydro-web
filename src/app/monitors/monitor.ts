export interface IMonitor {
  id: number;
  name: string;
  queryBody: string;
  queryDescription: string;
  dateCreated: string;
  dateUpdated: string;
  createdBy: string | null;
  updatedBy: string | null;
  status: Status;
  type: Type;
  categories: ICategory[];
  groups: IGroup[];
  actions: IAction[];
}

export interface IAction {
  id: number;
  name: string;
  group: ActionGroup;
}

export enum ActionGroup {
  Block = 'block',
  Email = 'email',
  Other = 'other',
  Store = 'store',
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IGroup {
  id: number;
  name: LDAPGroup;
}

export enum LDAPGroup {
  AppForensicMonitoringAppPlatform = 'App_Forensic Monitoring App Platform',
  AppForensicMonitoringDBAMembers = 'App_Forensic Monitoring DBA Members',
  AppForensicMonitoringDevTeam = 'App_Forensic Monitoring Dev Team',
  AppForensicMonitoringDevelopmentUser = 'App_Forensic Monitoring Development User',
  AppForensicMonitoringFraudAnalysis = 'App_Forensic Monitoring Fraud Analysis',
  AppForensicMonitoringITOperations = 'App_Forensic Monitoring IT Operations',
  AppForensicMonitoringManager = 'App_Forensic Monitoring Manager',
  AppForensicMonitoringNetworkEngineering = 'App_Forensic Monitoring Network Engineering',
  AppForensicMonitoringOTS = 'App_Forensic Monitoring OTS',
  AppForensicMonitoringOTSManagers = 'App_Forensic Monitoring OTS Managers',
  AppForensicMonitoringPublisherAbuse = 'App_Forensic Monitoring Publisher Abuse',
  AppForensicMonitoringRAndD = 'App_Forensic Monitoring R and D',
  JobsFinancialAnalyst = 'Jobs_Financial Analyst',
  JobsOperationsTechnicalSupportAdvisor = 'Jobs_Operations Technical Support Advisor',
  JobsOperationsTechnicalSupportAdvisorNightShift = 'Jobs_Operations Technical Support Advisor (Night Shift)',
  JobsOperationsTechnicalSupportAdvisorTwilightShift = 'Jobs_Operations Technical Support Advisor (Twilight Shift)',
  JobsOperationsTechnicalSupportSupervisor = 'Jobs_Operations Technical Support Supervisor',
  JobsOperationsTechnicalSupportSupervisorNightShift = 'Jobs_Operations Technical Support Supervisor (Night Shift)',
  JobsOperationsTechnicalSupportTeamLeader = 'Jobs_Operations Technical Support Team Leader',
}

export enum Status {
  Archived = 'archived',
  Offline = 'offline',
  Online = 'online',
}

export enum Type {
  Standard = 'standard',
  System = 'system',
}
