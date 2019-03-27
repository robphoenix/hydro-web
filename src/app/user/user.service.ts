import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private lastMonitorsStatusKey = `lastMonitorsStatus`;
  private lastMonitorsTypeKey = `lastMonitorsType`;

  public set lastMonitorsStatus(status: string) {
    localStorage.setItem(this.lastMonitorsStatusKey, status);
  }

  public get lastMonitorsStatus() {
    return localStorage.getItem(this.lastMonitorsStatusKey);
  }

  public set lastMonitorsType(type: string) {
    localStorage.setItem(this.lastMonitorsTypeKey, type);
  }

  public get lastMonitorsType() {
    return localStorage.getItem(this.lastMonitorsTypeKey);
  }
}
