import {
  IMonitor,
  ICategory,
  IAction,
  MonitorType,
  MonitorStatus,
  IGroup,
} from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
    return this.http.get<IMonitor[]>(this.monitorsUrl, { headers, params });
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

  // public getActions(): Observable<IAction[]> {
  //   return this.http.get<IAction[]>(this.actionsUrl, { headers });
  // }

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
    return this.http
      .get<IMonitor>(`${this.monitorsUrl}/${id}`, { headers })
      .pipe(
        tap((monitor: IMonitor) => monitor),
        catchError(this.handleError<IMonitor>('getMonitor')),
      );
  }

  public addMonitor(body: IMonitor): Observable<IMonitor> {
    return this.http
      .post<IMonitor>(this.monitorsUrl, body, { headers })
      .pipe(tap((monitor: IMonitor) => monitor));
  }

  public patchMonitor(id: number, body: IMonitor): Observable<IMonitor> {
    return this.http
      .patch(`${this.monitorsUrl}/${id}`, body, { headers })
      .pipe(tap((monitor: IMonitor) => monitor));
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

  public allCurrentActions(
    monitors: IMonitor[],
  ): { [group: string]: string[] } {
    const groups: { [group: string]: string[] } = {};

    monitors.forEach((monitor: IMonitor) => {
      monitor.actions.forEach((action: IAction) => {
        const group: string = action.group;
        const name: string = action.name;
        if (groups[group] === undefined) {
          // initialise the group array if it doesn't already exist
          groups[group] = [name];
        } else if (!groups[group].includes(name)) {
          // avoid duplicates
          groups[group].push(name);
        }
      });
    });

    // sort it out mate
    Object.keys(groups).forEach((group: string) => {
      groups[group] = groups[group].sort();
    });

    return groups;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
