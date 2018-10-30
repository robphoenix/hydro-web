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
      return (
        monitor.topic.toLowerCase().match(regex) ||
        monitor.queryDescription.toLowerCase().match(regex)
      );
    });
  }
  return monitors;
};

const filterCategories = (
  monitors: IMonitor[],
  categories: string[],
): IMonitor[] => {
  if (categories && categories.length > 0) {
    return monitors.filter((monitor: IMonitor) => {
      return categories.some((category: string) =>
        monitor.categories.map((c: ICategory) => c.value).includes(category),
      );
    });
  }
  return monitors;
};