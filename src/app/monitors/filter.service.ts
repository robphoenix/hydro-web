import { Injectable } from '@angular/core';
import { IMonitor, ICategory, IAction } from './monitor';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  matchesSearchTerm(monitor: IMonitor, searchTerm: string): boolean {
    const regex: RegExp = new RegExp(searchTerm.trim().toLowerCase(), 'gi');
    const match = `${monitor.name.toLowerCase()} ${monitor.description.toLowerCase()}`.match(
      regex,
    );
    return match && match.length > 0;
  }

  hasCategories(monitor: IMonitor, categories: string[]): boolean {
    return categories.every((selected: string) =>
      monitor.categories
        .map((category: ICategory) => category.name)
        .includes(selected),
    );
  }

  hasActions(monitor: IMonitor, actions: string[]): boolean {
    return actions.every((selected: string) =>
      monitor.actions.map((action: IAction) => action.name).includes(selected),
    );
  }
}
