import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys',
})
export class ObjectKeysPipe implements PipeTransform {
  transform(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
