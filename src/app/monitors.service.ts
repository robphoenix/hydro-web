import { LiveMonitor } from './monitors/monitor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonitorsService {
  baseUrl = `http://localhost:3000`;
  liveMonitorsUrl = `${this.baseUrl}/live-monitors`;

  constructor(private http: HttpClient) {}

  // API: GET /live-monitors
  public getLiveMonitors() {
    return this.http.get<LiveMonitor[]>(this.liveMonitorsUrl).pipe(
      tap((monitors: LiveMonitor[]) => console.log({ monitors })),
      catchError(this.handleError<LiveMonitor[]>('getLiveMonitors'))
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
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}