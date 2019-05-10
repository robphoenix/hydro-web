import { Injectable } from '@angular/core';
import { MonitorStatus } from '../monitors/monitor';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private lastMonitorsStatusKey = `lastMonitorsStatus`;
  private lastMonitorsTypeKey = `lastMonitorsType`;

  public set lastMonitorsStatus(status: MonitorStatus) {
    localStorage.setItem(this.lastMonitorsStatusKey, status);
  }

  public get lastMonitorsStatus(): MonitorStatus {
    return localStorage.getItem(this.lastMonitorsStatusKey) as MonitorStatus;
  }

  // TODO: remove these???
  public set lastMonitorsType(type: string) {
    localStorage.setItem(this.lastMonitorsTypeKey, type);
  }

  public get lastMonitorsType() {
    return localStorage.getItem(this.lastMonitorsTypeKey);
  }
}
