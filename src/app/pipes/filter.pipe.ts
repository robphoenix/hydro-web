import { IMonitor } from '../monitors/monitor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(monitors: IMonitor[], term: string): IMonitor[] {
    if (!monitors) {
      return [];
    }
    if (!term) {
      return monitors;
    }
    return monitors.filter((monitor: IMonitor) => {
      const regex: RegExp = new RegExp(term, 'gi');
      return monitor.topic.match(regex);
    });
  }
}
