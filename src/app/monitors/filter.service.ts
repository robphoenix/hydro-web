import { Injectable } from '@angular/core';
import { IMonitor, ICategory, IAction } from './monitor';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterPredicate(): (monitor: IMonitor, filter: string) => boolean {
    return (monitor: IMonitor, filter: string): boolean => {
      const {
        searchTerm,
        selectedActions,
        selectedCategories,
        status,
      } = JSON.parse(filter);

      const matchesSearchTerm: boolean = this.matchesSearchTerm(
        monitor,
        searchTerm,
      );
      const hasSelectedCategories: boolean = this.hasCategories(
        monitor,
        selectedCategories,
      );
      const hasSelectedActions: boolean = this.hasActions(
        monitor,
        Object.keys(selectedActions).reduce(
          (prev: string[], curr: string) => [...prev, ...selectedActions[curr]],
          [],
        ),
      );
      const hasStatus: boolean = this.hasStatus(monitor, status);

      return (
        matchesSearchTerm &&
        hasSelectedCategories &&
        hasSelectedActions &&
        hasStatus
      );
    };
  }

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

  hasStatus(monitor: IMonitor, status: string): boolean {
    return status === 'all' ? true : monitor.status === status;
  }
}