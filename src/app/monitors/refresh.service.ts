import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  // totes just done copy pasta this from SO
  // https://stackoverflow.com/a/43359682
  private eventSubject: Subject<any> = new ReplaySubject(1);

  // set observable of this subject
  get $refreshEvent(): Observable<any> {
    return this.eventSubject.asObservable();
  }

  // remove from observer
  resetRefreshEvent(): void {
    this.eventSubject = new ReplaySubject(1);
  }

  // send event to observers
  refresh(): void {
    this.eventSubject.next(true);
  }
}
