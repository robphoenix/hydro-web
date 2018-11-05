import { Pipe, PipeTransform } from '@angular/core';
import { IMonitor, ICategory } from './monitor';

@Pipe({
  name: 'filterMonitors',
})
export class FilterMonitorsPipe implements PipeTransform {
  transform(
    monitors: IMonitor[],
    searchTerm: string,
    categories: string[],
  ): IMonitor[] {
    return monitors
      ? filterSearch(filterCategories(monitors, categories), searchTerm)
      : monitors;
  }
}

const filterSearch = (monitors: IMonitor[], searchTerm: string): IMonitor[] => {
  if (searchTerm) {
    const regex: RegExp = new RegExp(searchTerm, 'gi');
    return monitors.filter((monitor: IMonitor) => {
      const categories = monitor.categories.reduce(
        (prev, curr) => `${prev} ${curr.value}`,
        '',
      );

      return `${monitor.topic.toLowerCase()} ${monitor.queryDescription.toLowerCase()} ${categories}`.match(
        regex,
      );
    });
  }
  return monitors;
};

const filterCategories = (
  monitors: IMonitor[],
  categories: string[],
): IMonitor[] => {
  if (!categories || categories.length === 0) {
    return monitors;
  }
  return monitors.filter((monitor: IMonitor) => {
    return categories.every((category: string) =>
      monitor.categories
        .map((c: ICategory) => c.value.toLowerCase())
        .includes(category),
    );
  });
};
