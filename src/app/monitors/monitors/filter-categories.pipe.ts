import { Pipe, PipeTransform } from '@angular/core';
import { IMonitor, ICategory } from '../monitor';

@Pipe({ name: 'filterCategories' })
export class FilterCategoriesPipe implements PipeTransform {
  transform(monitors: IMonitor[], categories: string[]): any {
    if (!monitors || !categories || categories.length === 0) {
      return monitors;
    }
    return monitors.filter((monitor: IMonitor) => {
      return categories.some((category: string) =>
        monitor.categories.map((c: ICategory) => c.value).includes(category),
      );
    });
  }
}
