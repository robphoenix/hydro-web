import { IMonitor, ICategory, IGroup, IAction, LDAPGroup } from './monitor';
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
  baseUrl = 'http://mn2splmfe001sd0:6080';
  monitorsUrl = `${this.baseUrl}/p/monitors`;
  optionsUrl = `${this.monitorsUrl}/options`;
  allCurrentActionsUrl = `${this.optionsUrl}/actions`;

  constructor(private http: HttpClient) {}

  public getMonitors(): Observable<IMonitor[]> {
    return this.http.get<IMonitor[]>(this.monitorsUrl, { headers });
  }

  public getStandardMonitors(): Observable<IMonitor[]> {
    const params = new HttpParams().set('type', 'standard');
    return this.http.get<IMonitor[]>(this.monitorsUrl, { headers, params });
  }

  public getAllCurrentActions(): Observable<IAction[]> {
    return this.http.get<IAction[]>(this.allCurrentActionsUrl, { headers });
  }

  /**
   * Gets a single monitor.
   *
   * @param {number} id
   * @returns {Observable<IMonitor>}
   * @memberof MonitorsService
   */
  public getMonitor(id: number): Observable<IMonitor> {
    return this.http
      .get<IMonitor>(`${this.monitorsUrl}/${id}`, { headers })
      .pipe(
        tap((monitor: IMonitor) => monitor),
        catchError(this.handleError<IMonitor>('getMonitor')),
      );
  }

  public sortMonitorsByName(monitors: IMonitor[]): IMonitor[] {
    return monitors.sort(this.compareMonitors);
  }

  private compareMonitors(a: IMonitor, b: IMonitor): 1 | -1 | 0 {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  /**
   * Text search of a given search term in a given list of monitors.
   *
   * @param {IMonitor[]} monitors
   * @param {string} searchTerm
   * @returns {IMonitor[]}
   * @memberof MonitorsService
   */
  searchMonitors(monitors: IMonitor[], searchTerm: string): IMonitor[] {
    const regex: RegExp = new RegExp(searchTerm, 'gi');
    return monitors.filter((monitor: IMonitor) => {
      const categories = monitor.categories.reduce(
        (prev, curr) => `${prev} ${curr.name}`,
        '',
      );
      return `${monitor.name.toLowerCase()} ${monitor.description.toLowerCase()} ${categories}`.match(
        regex,
      );
    });
  }

  /**
   * Filters a list of monitors by a given list of selected categories.
   *
   * @param {IMonitor[]} monitors
   * @param {string[]} selectedCategories
   * @returns {IMonitor[]}
   * @memberof MonitorsService
   */
  filterCategories(
    monitors: IMonitor[],
    selectedCategories: string[],
  ): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return selectedCategories.every((selected: string) =>
        monitor.categories
          .map((category: ICategory) => category.name)
          .includes(selected),
      );
    });
  }

  /**
   * Filters a list of monitors by a given list of selected groups.
   *
   * @param {IMonitor[]} monitors
   * @param {string[]} selectedGroups
   * @returns {IMonitor[]}
   * @memberof MonitorsService
   */
  filterGroups(monitors: IMonitor[], selectedGroups: string[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return selectedGroups.every((selected: LDAPGroup) =>
        monitor.groups.map((group: IGroup) => group.name).includes(selected),
      );
    });
  }

  filterActions(monitors: IMonitor[], selectedActions: string[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return selectedActions.every((selected: string) =>
        monitor.actions
          .map((action: IAction) => action.name)
          .includes(selected),
      );
    });
  }

  /**
   * Returns a complete list of categories derived from a list of monitors.
   *
   * @param {IMonitor[]} monitors
   * @returns {string[]}
   * @memberof MonitorsService
   */
  currentCategories(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.categories.map((category: ICategory) => category.name),
          ],
          [],
        ),
      ),
    ).sort();
  }

  /**
   * Returns a complete list of groups derived from a list of monitors.
   *
   * @param {IMonitor[]} monitors
   * @returns {string[]}
   * @memberof MonitorsService
   */
  currentGroups(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.groups.map((group: IGroup) => group.name),
          ],
          [],
        ),
      ),
    ).sort();
  }

  currentActions(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.actions.map((action: IAction) => action.name),
          ],
          [],
        ),
      ),
    ).sort();
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
