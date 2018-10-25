import { IMonitor } from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IMonitorData } from './monitor';

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

  ids: string[];

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of live monitors.
   *
   * @returns {Observable<IMonitor[]>}
   * @memberof MonitorsService
   */
  public getMonitors(): Observable<IMonitor[]> {
    return this.http.get<IMonitor[]>('api/monitors').pipe(
      tap((monitors: IMonitor[]) => monitors),
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
   * Gets the data for a single monitor.
   *
   * @param {number} id
   * @returns {Observable<IMonitorData>}
   * @memberof MonitorsService
   */
  public getMonitorData(id: number): Observable<IMonitorData> {
    return this.http.get<IMonitorData>(`${this.monitorsUrl}/${id}/data`).pipe(
      tap((monitor: IMonitorData) => monitor),
      catchError(this.handleError<IMonitorData>('getMonitorData')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    console.log({ operation });

    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
