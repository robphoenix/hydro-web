import {
  IMonitor,
  IMonitorData,
  ICategory,
  IGroup,
  IActionGroup,
  IAction,
} from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  baseUrl = `http://${environment.apiHost}:3000`;
  monitorsUrl = `${this.baseUrl}/monitors`;

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of live monitors.
   *
   * @returns {Observable<IMonitor[]>}
   * @memberof MonitorsService
   */
  public getMonitors(): Observable<IMonitor[]> {
    return this.http.get<IMonitor[]>('api/monitors').pipe(
      tap((monitors: IMonitor[]) => {
        return monitors;
      }),
      catchError(this.handleError<IMonitor[]>('getMonitors')),
    );
  }

  /**
   * Gets a single monitor.
   *
   * @param {number} id
   * @returns {Observable<IMonitor>}
   * @memberof MonitorsService
   */
  public getMonitorById(id: string): Observable<IMonitor> {
    return this.http.get<IMonitor>(`api/monitors/${id}`).pipe(
      tap((monitor: IMonitor) => monitor),
      catchError(this.handleError<IMonitor>('getMonitorById')),
    );
  }

  /**
   * Gets the associated data for a single monitor.
   *
   * @param {string} id
   * @returns {Observable<IMonitorData>}
   * @memberof MonitorsService
   */
  public getMonitorData(id: string): Observable<IMonitorData> {
    return this.http.get<IMonitorData>(`api/monitorsData/${id}`).pipe(
      tap((monitor: IMonitorData) => monitor),
      catchError(this.handleError<IMonitorData>('getMonitorData')),
    );
  }

  compareMonitors(a: IMonitor, b: IMonitor): 1 | -1 | 0 {
    if (a.topic.toLowerCase() < b.topic.toLowerCase()) {
      return -1;
    }
    if (a.topic.toLowerCase() > b.topic.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  searchMonitors(monitors: IMonitor[], searchTerm: string): IMonitor[] {
    const regex: RegExp = new RegExp(searchTerm, 'gi');
    return monitors.filter((monitor: IMonitor) => {
      const categories = monitor.categories.reduce(
        (prev, curr) => `${prev} ${curr.value}`,
        '',
      );
      return `${monitor.topic.toLowerCase()} ${monitor.queryDescription.toLowerCase()} ${categories}`.match(
        regex,
      );
    });
  }

  filterCategories(
    monitors: IMonitor[],
    selectedCategories: string[],
  ): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return selectedCategories.every((selected: string) =>
        monitor.categories
          .map((category: ICategory) => category.value)
          .includes(selected),
      );
    });
  }

  filterGroups(monitors: IMonitor[], selectedGroups: string[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      return selectedGroups.every((selected: string) =>
        monitor.groups.map((group: IGroup) => group.name).includes(selected),
      );
    });
  }

  filterActions(monitors: IMonitor[], selectedActions: string[]): IMonitor[] {
    return monitors.filter((monitor: IMonitor) => {
      const currentActions: string[] = monitor.actionGroups.reduce(
        (prev: string[], curr: IActionGroup) => [
          ...prev,
          ...curr.actions.map((action: IAction) => action.name),
        ],
        [],
      );
      return selectedActions.every((selected: string) =>
        currentActions.includes(selected),
      );
    });
  }

  /**
   * Sets a complete list of categories derived from the current monitors.
   *
   * @private
   * @memberof MonitorsComponent
   */
  currentCategories(monitors: IMonitor[]): string[] {
    return Array.from(
      new Set(
        monitors.reduce(
          (prev: string[], curr: IMonitor) => [
            ...prev,
            ...curr.categories.map((category: ICategory) => category.value),
          ],
          [],
        ),
      ),
    ).sort();
  }

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
    const allActions: string[] = monitors
      .reduce((prev: IAction[][], curr: IMonitor) => {
        return [
          ...prev,
          ...curr.actionGroups.map((a: IActionGroup) => a.actions),
        ];
      }, [])
      .reduce((prevActions: string[], currActions: IAction[]) => {
        return [
          ...prevActions,
          ...currActions.map((action: IAction) => action.name),
        ];
      }, []);
    // remove duplicate actions
    return Array.from(new Set(allActions)).sort();
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
