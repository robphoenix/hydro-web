import { IMonitor } from './monitor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MonitorData } from './monitor-data';
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
  liveMonitorsUrl = `${this.baseUrl}/liveMonitors`;
  monitorDataUrl = `${this.baseUrl}/monitorData`;

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of live monitors.
   *
   * @returns {Observable<IMonitor[]>}
   * @memberof MonitorsService
   */
  public getLiveMonitors(): Observable<IMonitor[]> {
    return this.http.get<IMonitor[]>(this.liveMonitorsUrl).pipe(
      tap((monitors: IMonitor[]) => console.log({ monitors })),
      catchError(this.handleError<IMonitor[]>('getLiveMonitors')),
    );
  }

  /**
   * Gets a single monitor.
   *
   * @param {number} id
   * @returns {Observable<IMonitor>}
   * @memberof MonitorsService
   */
  public getLiveMonitorById(id: number): Observable<IMonitor> {
    return this.http.get<IMonitor>(`${this.liveMonitorsUrl}/${id}`).pipe(
      tap((monitor: IMonitor) => console.log({ monitor })),
      catchError(this.handleError<IMonitor>('getLiveMonitorById')),
    );
  }

  /**
   * Gets the data for a single monitor.
   *
   * @param {number} id
   * @returns {Observable<MonitorData>}
   * @memberof MonitorsService
   */
  public getMonitorDataById(id: number): Observable<MonitorData> {
    return this.http.get<MonitorData>(`${this.monitorDataUrl}/${id}`).pipe(
      tap((monitor: MonitorData) => console.log({ monitor })),
      catchError(this.handleError<MonitorData>('getMonitorDataById')),
    );
  }

  // TODO: move to shared service.
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
