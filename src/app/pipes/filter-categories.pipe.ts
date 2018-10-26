import { Pipe, PipeTransform } from '@angular/core';
import { IMonitor, ICategory } from '../monitors/monitor';

@Pipe({ name: 'filterCategories' })
export class FilterCategoriesPipe implements PipeTransform {
  transform(monitors: IMonitor[], categories: string[]): any {
    if (!monitors || !categories) {
      return monitors;
    }
    return monitors.filter((monitor: IMonitor) => {
      return monitor.categories.map((c) => c.value).includes(categories[0]);
      // return categories.some((category: string) =>
      //   monitor.categories.map((c: ICategory) => c.value).includes(category),
      // );
    });
  }
}
