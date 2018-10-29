import { IMonitor } from '../monitor';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filters an array of monitors, returning only those
 * monitors that match the given term.
 *
 * @export
 * @class FilterPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'filterTopics' })
export class FilterTopicsPipe implements PipeTransform {
  transform(monitors: IMonitor[], term: string): IMonitor[] {
    if (!monitors || !term) {
      return monitors;
    }
    return monitors.filter((monitor: IMonitor) => {
      const regex: RegExp = new RegExp(term, 'gi');
      return monitor.topic.match(regex);
    });
  }
}
