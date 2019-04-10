import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IAction } from './actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  readonly baseUrl = `http://mn2formlt0001d0:6080`;
  monitorsUrl = `${this.baseUrl}/p/monitors`;
  optionsUrl = `${this.monitorsUrl}/options`;
  actionsUrl = `${this.optionsUrl}/actions`;

  public getActions(): Observable<IAction[]> {
    return this.http.get<IAction[]>(this.actionsUrl, { headers });
  }

  public addAction(body: IAction): Observable<IAction> {
    return this.http
      .post<IAction>(this.actionsUrl, body, { headers })
      .pipe(tap((action: IAction) => action));
  }

  constructor(private http: HttpClient) {}
}
