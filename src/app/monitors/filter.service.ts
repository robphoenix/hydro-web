import { Injectable } from '@angular/core';
import { IMonitor, ICategory, IAction, IGroup } from './monitor';
import { IActions } from '../actions/actions';

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

  public filterCategories(
    term: string | ICategory,
    available: ICategory[],
    selected: ICategory[],
  ): ICategory[] {
    const availableCategories = available.filter(
      (category: ICategory) =>
        !selected.map((s: ICategory) => s.id).includes(category.id),
    );
    if (!term || typeof term !== 'string') {
      return availableCategories;
    }
    return availableCategories.filter((category: ICategory) =>
      category.name.toLowerCase().includes(term.toLowerCase()),
    );
  }

  public filterGroups(
    term: string | IGroup,
    available: IGroup[],
    selected: IGroup[],
  ): IGroup[] {
    const availableGroups = available.filter(
      (group: IGroup) => !selected.map((s: IGroup) => s.id).includes(group.id),
    );
    if (!term || typeof term !== 'string') {
      return availableGroups;
    }
    return availableGroups.filter((group: IGroup) =>
      group.name.toLowerCase().includes(term.toLowerCase()),
    );
  }

  public filterActions(
    term: string | IActions,
    available: IActions[],
    selected: IActions[],
  ): IActions[] {
    const availableActions = available.filter(
      (action: IActions) =>
        !selected.map((s: IActions) => s.id).includes(action.id),
    );
    if (!term || typeof term !== 'string') {
      return availableActions;
    }
    return availableActions.filter((action: IActions) =>
      action.name.toLowerCase().includes(term.toLowerCase()),
    );
  }
}
