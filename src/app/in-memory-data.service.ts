import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { IMonitor, Category } from './monitors/monitor';
import { IMonitorData, IEsperItem } from './monitors/monitor';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  private ids: string[];

  private monitorData(id: string): IMonitorData {
    const timeStamp: Date = faker.date.recent();
    const headers: string[] = Array.from(
      Array(faker.random.number({ min: 5, max: 7 })),
    ).map(() => {
      return faker.random.word();
    });

    const esperItems: Array<IEsperItem[]> = Array.from(
      Array(faker.random.number({ min: 20, max: 100 })),
    ).map(() => {
      return headers.map((key: string, i: number) => {
        let value: string;
        if (i % 3 === 0) {
          value = faker.random.word();
        } else if (i % 2 === 0) {
          value = faker.random.words(faker.random.number({ min: 2, max: 5 }));
        } else {
          value = faker.internet.ip();
        }
        return { key, value } as IEsperItem;
      });
    });

    return {
      id,
      headers,
      timeStamp,
      esperItems,
    } as IMonitorData;
  }

  createDb() {
    this.ids = Array.from(
      Array(faker.random.number({ min: 30, max: 120 })),
    ).map(() => {
      return faker.random.uuid();
    });

    const monitors: IMonitor[] = this.ids.map((id: string) => {
      return {
        id,
        topic: faker.random.words(),
        queryBody: faker.lorem.paragraph(),
        queryDescription: faker.lorem.sentence(),
        dateCreated: faker.date.past(),
        categories: Array.from(
          Array(faker.random.number({ min: 1, max: 4 })),
        ).map(() => {
          return {
            id: faker.random.uuid(),
            value: faker.random.word(),
            dateCreated: faker.date.past(),
          } as Category;
        }),
      } as IMonitor;
    });

    const monitorsData: IMonitorData[] = this.ids.map((id: string) => {
      return this.monitorData(id);
    });
    return { monitors, monitorsData };
  }
}
