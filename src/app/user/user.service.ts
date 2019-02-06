import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private lastMonitorsStatusName = 'lastMonitorsStatus';

  public set lastMonitorsStatus(status: string) {
    console.log({ status });

    localStorage.setItem(this.lastMonitorsStatusName, status);
  }

  public get lastMonitorsStatus() {
    return localStorage.getItem(this.lastMonitorsStatusName);
  }
}
