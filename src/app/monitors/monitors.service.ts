import {
  IMonitor,
  ICategory,
  MonitorType,
  MonitorStatus,
  IGroup,
  ICategories,
} from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAction } from '../actions/action';
import { environment } from '../../environments/environment';
import { IFeedTypes } from './feedtypes';

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
  readonly baseUrl = environment.apiUrl;
  monitorsUrl = `${this.baseUrl}/p/monitors`;
  optionsUrl = `${this.monitorsUrl}/options`;
  actionsUrl = `${this.optionsUrl}/actions`;
  categoriesUrl = `${this.optionsUrl}/categories`;
  groupsUrl = `${this.optionsUrl}/groups`;
  feedTypesUrl = `${this.optionsUrl}/feedtypes`;

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

  private compareByName(a: IMonitor, b: IMonitor): -1 | 1 | 0 {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  public getStandardMonitors(): Observable<IMonitor[]> {
    const type: MonitorType = MonitorType.Standard;
    const params = new HttpParams().set('type', type);
    return this.http
      .get<IMonitor[]>(this.monitorsUrl, { headers, params })
      .pipe(map((monitors: IMonitor[]) => monitors.sort(this.compareByName)));
  }

  public getArchivedMonitors(): Observable<IMonitor[]> {
    const params: HttpParams = new HttpParams()
      .set('type', MonitorType.Standard)
      .set('status', MonitorStatus.Archived);

    return this.http
      .get<IMonitor[]>(this.monitorsUrl, { headers, params })
      .pipe(map((monitors: IMonitor[]) => monitors.sort(this.compareByName)));
  }

  public getSystemMonitors(): Observable<IMonitor[]> {
    const params = new HttpParams().set('type', MonitorType.System);
    return this.http
      .get<IMonitor[]>(this.monitorsUrl, { headers, params })
      .pipe(map((monitors: IMonitor[]) => monitors.sort(this.compareByName)));
  }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesUrl, {
      headers,
    });
  }

  public addCategories(categories: ICategories): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(this.categoriesUrl, categories, {
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

  public getFeedTypes(): Observable<IFeedTypes> {
    return this.http.get<IFeedTypes>(this.feedTypesUrl, { headers });
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
