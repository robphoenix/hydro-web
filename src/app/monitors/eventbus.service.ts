import { Injectable } from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import { Observable, Subscriber } from 'rxjs';
import {
  IMonitorData,
  IMonitorDisplayData,
  IMonitorDataHeader,
  IMonitorDataAttributes,
  IHeadersMetadata,
  MonitorDataAttribute,
} from './monitor-data';
import { format as dateFnsFormat } from 'date-fns/esm';

@Injectable({
  providedIn: 'root',
})
export class EventbusService {
  private eventBusUrl = 'http://mn2formlt0002d0:6081/eventbus';
  private outputAddress = 'result.pub.output';
  private cachedAddress = 'result.pub.cached';
  private ebs: { name: string; eb: EventBus.EventBus }[] = [];
  private eventbusHeaders: { [key: string]: any } = {};
  private dateTimeColumnType = 'dateTime';

  constructor() {}

  getCachedData(name: string) {
    const observable = new Observable((observer) => {
      const eb: EventBus.EventBus = this.newEventBus('cached data');
      eb.onopen = () => {
        console.log('cached data connection open');
        eb.send(
          this.cachedAddress,
          name,
          this.eventbusHeaders,
          this.handleEventBusReply(observer),
        );
      };

      return () => {
        eb.close();
      };
    });

    return observable;
  }

  getLiveData(name: string) {
    const observable = new Observable((observer: Subscriber<{}>) => {
      const eb = this.newEventBus('live data');
      const address = `${this.outputAddress}.${name}`;

      eb.onopen = () => {
        console.log('live data connection open');
        eb.registerHandler(
          address,
          this.eventbusHeaders,
          this.handleEventBusReply(observer),
        );
      };

      return () => {
        eb.close();
      };
    });

    return observable;
  }

  private handleEventBusReply(
    observer: Subscriber<{}>,
  ): (error: Error, message: IMonitorData) => any {
    return (error: Error, message: IMonitorData) => {
      if (error) {
        console.error({ error });
      }
      if (message) {
        const data: IMonitorDisplayData = this.getDisplayData(message);
        observer.next(data);
      }
    };
  }

  closeConnections() {
    this.ebs.map((eb) => eb.eb.close());
  }

  private newEventBus(name: string): EventBus.EventBus {
    const eb = new EventBus(this.eventBusUrl);
    eb.enableReconnect(true);
    eb.onerror = () => console.error(`${name} connection error`);
    eb.onclose = () => {
      this.ebs = this.ebs.filter((e) => e.name !== name);
      console.log(`${name} connection closed`);
    };
    this.ebs.push({ name, eb });
    return eb;
  }

  private getDisplayData(message: IMonitorData): IMonitorDisplayData {
    const { body } = message;

    // If there is no data a string saying so is returned. This is going to
    // change to be an empty data structure instead.
    if (typeof body === 'string') {
      return;
    }

    const { h, d } = body;

    const headersMetadata: IHeadersMetadata = {};

    const headers: string[] = h.map((header: IMonitorDataHeader) => {
      const { n: name, t: type, f: format } = header;
      if (type) {
        headersMetadata[header.n] = { type, format };
      }
      return name;
    });

    const data: IMonitorDataAttributes[] = d.map(
      (attributes: MonitorDataAttribute[]) => {
        return attributes.reduce(
          (columns: {}, column: MonitorDataAttribute, i: number) => {
            const header: string = headers[i];
            columns[header] = this.formatColumnData(
              column,
              header,
              headersMetadata,
            );
            return columns;
          },
          {},
        );
      },
    );

    return { headers, headersMetadata, data } as IMonitorDisplayData;
  }

  private formatColumnData(
    column: MonitorDataAttribute,
    header: string,
    headersMetadata: IHeadersMetadata,
  ): MonitorDataAttribute {
    const type: string = headersMetadata[header]
      ? headersMetadata[header].type
      : '';
    if (type !== this.dateTimeColumnType) {
      return column;
    }
    const ms: number = column as number;
    const formatted = dateFnsFormat(
      new Date(ms),
      // TODO: #4
      // columns[column].format,
      'HH:mm dd/MM/yyyy',
    );
    return formatted;
  }
}
