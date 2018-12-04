import { IMonitor, ICategory, IGroup, IAction, LDAPGroup } from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IMonitorData } from './monitor-data';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

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
   * Gets the list of monitors.
   *
   * @returns {Observable<IMonitor[]>}
   * @memberof MonitorsService
   */
  public getMonitors(): Observable<IMonitor[]> {
    return this.http.get<IMonitor[]>('api/monitors', httpOptions).pipe(
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
  public getMonitor(id: number): Observable<IMonitor> {
    return this.http.get<IMonitor>(`api/monitors/${id}`, httpOptions).pipe(
      tap((monitor: IMonitor) => monitor),
      catchError(this.handleError<IMonitor>('getMonitor')),
    );
  }

  // public addMonitor(monitor: IMonitor): Observable<IMonitor> {
  //   return this.http.post<IMonitor>(`api/monitors`, monitor, httpOptions).pipe(
  //     tap((m: IMonitor) => m),
  //     catchError(this.handleError<IMonitor>('addMonitor')),
  //   );
  // }

  // public deleteMonitor(id: number): Observable<IMonitor> {
  //   return this.http.delete<IMonitor>(`api/monitors/${id}`, httpOptions).pipe(
  //     tap((monitor: IMonitor) => monitor),
  //     catchError(this.handleError<IMonitor>('deleteMonitor')),
  //   );
  // }

  /**
   * Gets the associated data for a single monitor.
   *
   * @param {string} id
   * @returns {Observable<IMonitorData>}
   * @memberof MonitorsService
   */
  // public getMonitorData(id: string): Observable<IMonitorData> {
  //   return this.http.get<IMonitorData>(`api/monitorsData/${id}`).pipe(
  //     tap((monitor: IMonitorData) => monitor),
  //     catchError(this.handleError<IMonitorData>('getMonitorData')),
  //   );
  // }

  /**
   * Compares monitors for sorting.
   *
   * @param {IMonitor} a
   * @param {IMonitor} b
   * @returns {(1 | -1 | 0)}
   * @memberof MonitorsService
   */
  compareMonitors(a: IMonitor, b: IMonitor): 1 | -1 | 0 {
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
      return `${monitor.name.toLowerCase()} ${monitor.queryDescription.toLowerCase()} ${categories}`.match(
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

  /**
   * Filters a list of monitors by a given list of selected actions.
   *
   * @param {IMonitor[]} monitors
   * @param {string[]} selectedActions
   * @returns {IMonitor[]}
   * @memberof MonitorsService
   */
  // filterActions(monitors: IMonitor[], selectedActions: string[]): IMonitor[] {
  //   return monitors.filter((monitor: IMonitor) => {
  //     const currentActions: string[] = monitor.actionGroups.reduce(
  //       (prev: string[], curr: IActionGroup) => [
  //         ...prev,
  //         ...curr.actions.map((action: IAction) => action.name),
  //       ],
  //       [],
  //     );
  //     return selectedActions.every((selected: string) =>
  //       currentActions.includes(selected),
  //     );
  //   });
  // }

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

  /**
   * Returns a complete list of actions derived from a list of monitors.
   *
   * @param {IMonitor[]} monitors
   * @returns {string[]}
   * @memberof MonitorsService
   */
  // currentActions(monitors: IMonitor[]): string[] {
  //   const allActions: string[] = monitors
  //     .reduce((prev: IAction[][], curr: IMonitor) => {
  //       return [
  //         ...prev,
  //         ...curr.actionGroups.map((a: IActionGroup) => a.actions),
  //       ];
  //     }, [])
  //     .reduce((prevActions: string[], currActions: IAction[]) => {
  //       return [
  //         ...prevActions,
  //         ...currActions.map((action: IAction) => action.name),
  //       ];
  //     }, []);
  //   // remove duplicate actions
  //   return Array.from(new Set(allActions)).sort();
  // }

  /**
   * Returns a single string that contains the list of actions.
   *
   * @param {IAction[]} actions
   * @returns {string}
   * @memberof MonitorsListItemComponent
   */
  actionNames(actions: IAction[]): string {
    return actions.map((action) => action.name).join('\n');
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
