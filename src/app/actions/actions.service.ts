import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IAction } from './action';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  readonly baseUrl = environment.apiUrl;
  monitorsUrl = `${this.baseUrl}/p/monitors`;
  optionsUrl = `${this.monitorsUrl}/options`;
  actionsUrl = `${this.optionsUrl}/actions`;

  constructor(private http: HttpClient) {}

  public getActions(): Observable<IAction[]> {
    return this.http.get<IAction[]>(this.actionsUrl, { headers });
  }

  public addAction(body: IAction): Observable<IAction> {
    return this.http.post<IAction>(this.actionsUrl, body, { headers });
  }

  public putAction(action: IAction): Observable<IAction> {
    return this.http.put<IAction>(`${this.actionsUrl}/${action.id}`, action, {
      headers,
    });
  }

  public archiveAction(action: IAction): Observable<IAction> {
    action.archived = true;
    return this.putAction(action);
  }

  public getActionById(id: number): Observable<IAction> {
    return this.http.get<IAction>(`${this.actionsUrl}/${id}`, { headers });
  }
}
