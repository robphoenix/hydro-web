import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IActions } from './actions';
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

  public addAction(body: IActions): Observable<IActions> {
    return this.http
      .post<IActions>(this.actionsUrl, body, { headers })
      .pipe(tap((action: IActions) => action));
  }

  constructor(private http: HttpClient) {}
}
