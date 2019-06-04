import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public title(page: string): string {
    return `Hydro | ${page}`;
  }
}
