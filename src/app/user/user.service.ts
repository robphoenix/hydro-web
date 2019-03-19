import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private lastMonitorsStatusName = 'lastMonitorsStatus';
  private lastMonitorsTypeName = 'lastMonitorsType';

  public set lastMonitorsStatus(status: string) {
    localStorage.setItem(this.lastMonitorsStatusName, status);
  }

  public get lastMonitorsStatus() {
    return localStorage.getItem(this.lastMonitorsStatusName);
  }

  public set lastMonitorsType(type: string) {
    localStorage.setItem(this.lastMonitorsTypeName, type);
  }

  public get lastMonitorsType() {
    return localStorage.getItem(this.lastMonitorsTypeName);
  }
}
