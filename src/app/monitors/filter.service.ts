import { Injectable } from '@angular/core';
import { IMonitor, ICategory, IGroup } from './monitor';
import { IAction } from '../actions/action';
import { IFilterValues } from './filter-values';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public filterMonitors(
    monitors: IMonitor[],
    filterValues: IFilterValues,
  ): IMonitor[] {
    const { status, searchTerm, selectedCategories } = filterValues;

    return monitors.filter((monitor: IMonitor) => {
      return (
        monitor.status === status &&
        this.matchesSearchTerm(monitor, searchTerm) &&
        this.hasSelectedCategories(monitor.categories, selectedCategories)
      );
    });
  }

  private hasSelectedCategories(
    categories: ICategory[],
    selected: string[],
  ): boolean {
    if (!selected || !selected.length) {
      return true;
    }

    return categories
      .map((category: ICategory) => category.name)
      .some((name: string) => selected.includes(name));
  }

  private matchesSearchTerm(monitor: IMonitor, searchTerm: string): boolean {
    if (!searchTerm) {
      return true;
    }
    const regex: RegExp = new RegExp(searchTerm.trim().toLowerCase(), 'gi');
    const term = `${monitor.name} ${monitor.description}`.toLowerCase();
    const match = term.match(regex);
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
    term: string | IAction,
    available: IAction[],
    selected: IAction[],
  ): IAction[] {
    const availableActions = available.filter(
      (action: IAction) =>
        !selected.map((s: IAction) => s.id).includes(action.id),
    );
    if (!term || typeof term !== 'string') {
      return availableActions;
    }
    return availableActions.filter((action: IAction) =>
      action.name.toLowerCase().includes(term.toLowerCase()),
    );
  }
}
