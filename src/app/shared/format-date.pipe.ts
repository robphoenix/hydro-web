import { Pipe, PipeTransform } from '@angular/core';
import { format as formatDate } from 'date-fns';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(date: Date, format?: string): string {
    return date ? formatDate(date, format) : '';
  }
}
