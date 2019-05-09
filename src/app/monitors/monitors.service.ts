import {
  IMonitor,
  ICategory,
  MonitorType,
  MonitorStatus,
  IGroup,
} from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAction } from '../actions/action';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

/**
 * Manages access to the monitors data on the server.
 *
 * @export
 * @class MonitorsService
 */
@Injectable({
  providedIn: 'root',
})
export class MonitorsService {
  readonly baseUrl = `http://mn2formlt0001d0:6080`;
  monitorsUrl = `${this.baseUrl}/p/monitors`;
  optionsUrl = `${this.monitorsUrl}/options`;
  actionsUrl = `${this.optionsUrl}/actions`;
  categoriesUrl = `${this.optionsUrl}/categories`;
  groupsUrl = `${this.optionsUrl}/groups`;

  readonly actionsGroups: string[] = ['block', 'email', 'store', 'other'];
  readonly actionsIcons: { [group: string]: string } = {
    block: 'block',
    email: 'mail_outline',
    store: 'check',
    other: 'subject',
  };

  constructor(private http: HttpClient) {}

  public getMonitors(): Observable<IMonitor[]> {
    return this.http.get<IMonitor[]>(this.monitorsUrl, { headers });
  }

  public getStandardMonitors(): Observable<IMonitor[]> {
    const type: MonitorType = MonitorType.Standard;
    const params = new HttpParams().set('type', type);
    return this.http
      .get<IMonitor[]>(this.monitorsUrl, { headers, params })
      .pipe(
        map(
          // filter out archived monitors
          (monitors: IMonitor[]) =>
            monitors.filter(
              (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
            ),
        ),
      );
  }

  public getArchivedMonitors(): Observable<IMonitor[]> {
    const type: MonitorType = MonitorType.Standard;
    const status: MonitorStatus = MonitorStatus.Archived;
    const params: HttpParams = new HttpParams()
      .set('type', type)
      .set('status', status);
    return this.http.get<IMonitor[]>(this.monitorsUrl, { headers, params });
  }

  public getSystemMonitors(): Observable<IMonitor[]> {
    const type: MonitorType = MonitorType.System;
    const params = new HttpParams().set('type', type);
    return this.http.get<IMonitor[]>(this.monitorsUrl, { headers, params });
  }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesUrl, {
      headers,
    });
  }

  public getGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(this.groupsUrl, { headers });
  }

  /**
   * Gets a single monitor.
   *
   * @param {number} id
   * @returns {Observable<IMonitor>}
   * @memberof MonitorsService
   */
  public getMonitorById(id: number): Observable<IMonitor> {
    return this.http.get<IMonitor>(`${this.monitorsUrl}/${id}`, { headers });
  }

  public addMonitor(body: IMonitor): Observable<IMonitor> {
    return this.http.post<IMonitor>(this.monitorsUrl, body, { headers });
  }

  public putMonitor(monitor: IMonitor): Observable<IMonitor> {
    return this.http.put<IMonitor>(
      `${this.monitorsUrl}/${monitor.id}`,
      monitor,
      { headers },
    );
  }

  public allCurrentCategories(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce((prev: string[], curr: IMonitor) => {
          return [
            ...prev,
            ...curr.categories.map((category: ICategory) => category.name),
          ];
        }, []),
      ),
    ).sort();
  }

  public allCurrentActions(monitors: IMonitor[]) {
    const actionTypes: { [group: string]: string[] } = {};

    monitors.forEach((monitor: IMonitor) => {
      monitor.actions.forEach((action: IAction) => {
        const actionType: string = action.actionType;
        const name: string = action.name;
        if (actionTypes[actionType] === undefined) {
          // initialise the actionType array if it doesn't already exist
          actionTypes[actionType] = [name];
        } else if (!actionTypes[actionType].includes(name)) {
          // avoid duplicates
          actionTypes[actionType].push(name);
        }
      });
    });

    // sort it out mate
    Object.keys(actionTypes).forEach((actionType: string) => {
      actionTypes[actionType] = actionTypes[actionType].sort();
    });

    return actionTypes;
  }
}
