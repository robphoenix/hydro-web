import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchData } from './search-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionarySearchService {
  baseUrl = `http://localhost:3000`;
  searchDataUrl = `${this.baseUrl}/searchData`;

  constructor(private http: HttpClient) {}

  public getMockSearch(): Observable<SearchData> {
    return this.http.get<SearchData>(this.searchDataUrl).pipe(
      tap((searchResult: SearchData) => console.log({ searchResult })),
      catchError(this.handleError<SearchData>('getMockSearch'))
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
