import { Injectable } from '@angular/core';
import {
  MonitorDataAttribute,
  MonitorDataAttributeType,
  IMonitorDataAttributes,
  IHeadersMetadata,
} from './monitor-data';
import { Sort } from '@angular/material';
import { IMonitor } from './monitor';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  public sortMonitors(data: IMonitor[], sort: Sort): IMonitor[] {
    const isAsc = sort.direction === 'asc';
    return data.sort((a: IMonitor, b: IMonitor) =>
      this.compare(a.name, b.name, isAsc),
    );
  }

  public sortMonitorData(
    data: IMonitorDataAttributes[],
    sort: Sort,
    headersMetadata: IHeadersMetadata,
  ): IMonitorDataAttributes[] {
    const columnId = sort.active;
    const isAsc = sort.direction === 'asc';
    const type: string = headersMetadata[sort.active]
      ? headersMetadata[sort.active].type
      : '';

    return data.sort((a, b) => {
      switch (type) {
        case MonitorDataAttributeType.Ip:
          return this.compare(
            this.sortableIpAddress(a[columnId] as string),
            this.sortableIpAddress(b[columnId] as string),
            isAsc,
          );
        case MonitorDataAttributeType.DateTime:
          return this.compare(
            new Date(a[columnId] as number),
            new Date(a[columnId] as number),
            isAsc,
          );
        default:
          return this.compare(a[columnId], b[columnId], isAsc);
      }
    });
  }

  private sortableIpAddress(ip: string): string {
    return ip
      .split('.')
      .map((octet: string) => octet.padStart(3, '0'))
      .join('');
  }

  private compare(
    a: MonitorDataAttribute | Date | string,
    b: MonitorDataAttribute | Date | string,
    isAsc: boolean,
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
