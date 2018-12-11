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
  allCurrentCategoriesUrl = `${this.optionsUrl}/categories`;

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

  public getAllCurrentCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.allCurrentCategoriesUrl, {
      headers,
    });
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
