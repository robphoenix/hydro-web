import { Injectable } from '@angular/core';
import EventBus from 'vertx3-eventbus-client';
import { Observable, Subscriber } from 'rxjs';
import {
  IMonitorData,
  IMonitorDisplayData,
  IMonitorDataHeader,
  IMonitorDataAttributes,
  IHeadersMetadata,
  MonitorDataAttribute,
  IMonitorDataBody,
} from './monitor-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventbusService {
  private eventBusUrl = `${environment.eventBusUrl}/eventbus`;
  private outputAddress = 'result.pub.output';
  private cachedAddress = 'result.pub.cached';
  private statusAddress = 'monitor.status';
  private ebs: { name: string; eb: EventBus.EventBus }[] = [];
  private eventbusHeaders: { [key: string]: any } = {};

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
          this.handleEventBusDataReply(observer),
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
          this.handleEventBusDataReply(observer),
        );
      };

      return () => {
        eb.close();
      };
    });

    return observable;
  }

  getChangeEvents(name: string) {
    const observable = new Observable((observer: Subscriber<{}>) => {
      const eb = this.newEventBus('monitor status');
      const address = `${this.statusAddress}.${name}`;

      eb.onopen = () => {
        console.log('monitor status connection open');
        eb.registerHandler(
          address,
          this.eventbusHeaders,
          this.handleEventBusStatusReply(observer),
        );
      };

      return () => {
        eb.close();
      };
    });

    return observable;
  }

  private handleEventBusDataReply(
    observer: Subscriber<{}>,
  ): (error: Error, message: IMonitorData) => any {
    return (error: Error, message: IMonitorData) => {
      if (error) {
        console.error({ error });
        observer.error(error);
      }
      if (message) {
        const data: IMonitorDisplayData = this.getDisplayData(message);
        observer.next(data);
      }
    };
  }

  private handleEventBusStatusReply(
    observer: Subscriber<{}>,
  ): (error: Error, message: IMonitorData) => any {
    return (error: Error, message: IMonitorData) => {
      if (error) {
        console.error({ error });
        observer.error(error);
      }
      if (message) {
        const { body } = message;
        observer.next(body);
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
    if (!body) {
      return { data: [] } as IMonitorDisplayData;
    }

    const { h, d } = body as IMonitorDataBody;

    const headersMetadata: IHeadersMetadata = h.reduce(
      (
        metadata: { [name: string]: { type: string; format: string } },
        header: IMonitorDataHeader,
      ) => {
        const { n: name, t: type, f: format } = header;
        metadata[name] = { type, format };
        return metadata;
      },
      {},
    );

    const headers: string[] = h.map((header: IMonitorDataHeader) => header.n);

    const data: IMonitorDataAttributes[] = d.map(
      (attributes: MonitorDataAttribute[]) => {
        return attributes.reduce(
          (
            columns: { [header: string]: MonitorDataAttribute },
            column: MonitorDataAttribute,
            i: number,
          ) => {
            columns[headers[i]] = column;
            return columns;
          },
          {},
        );
      },
    );

    return { headers, headersMetadata, data } as IMonitorDisplayData;
  }
}
