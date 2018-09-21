import { LiveMonitor } from './monitors/monitor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(monitors: LiveMonitor[], term: string): LiveMonitor[] {
    if (!monitors) {
      return [];
    }
    if (!term) {
      return monitors;
    }
    return monitors.filter((monitor: LiveMonitor) => {
      const regex: RegExp = new RegExp(term, 'gi');
      return monitor.topic.match(regex);
    });
  }
}
