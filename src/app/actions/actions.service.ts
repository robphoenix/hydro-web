import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IAction } from './action';
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

  constructor(private http: HttpClient) {}

  public getActions(): Observable<IAction[]> {
    return this.http.get<IAction[]>(this.actionsUrl, { headers });
  }

  public addAction(body: IAction): Observable<IAction> {
    return this.http
      .post<IAction>(this.actionsUrl, body, { headers })
      .pipe(tap((a: IAction) => a));
  }

  public putAction(action: IAction): Observable<IAction> {
    return this.http
      .put(`${this.actionsUrl}/${action.id}`, action, { headers })
      .pipe(tap((a: IAction) => a));
  }

  public archiveAction(action: IAction): Observable<IAction> {
    action.archived = true;
    return this.putAction(action);
  }

  public getActionById(id: number): Observable<IAction> {
    return this.http
      .get<IAction>(`${this.actionsUrl}/${id}`, { headers })
      .pipe(tap((a: IAction) => a));
  }
}
