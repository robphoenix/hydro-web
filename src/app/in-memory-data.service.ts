import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { IMonitor, Category } from './monitors/monitor';
import { IMonitorData, EsperItem } from './monitors/monitor';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  singleMonitor(): IMonitor {
    const id: string = faker.random.uuid();
    return {
      id,
      topic: faker.random.words(),
      queryBody: faker.lorem.paragraph(),
      queryDescription: faker.lorem.sentence(),
      dateCreated: faker.date.past(),
      categories: this.categories(),
      data: this.monitorData(id),
    } as IMonitor;
  }

  multipleMonitors(): IMonitor[] {
    return Array.from(Array(faker.random.number(100))).map(() => {
      return this.singleMonitor();
    });
  }

  categories(): Category[] {
    return Array.from(Array(faker.random.number(4))).map(() => {
      return {
        id: faker.random.uuid(),
        value: faker.random.word(),
        dateCreated: faker.date.past(),
      } as Category;
    });
  }

  monitorData(id: string): IMonitorData {
    const timeStamp: Date = faker.date.recent();
    const headers: string[] = Array.from(Array(faker.random.number(12))).map(
      () => {
        return faker.random.word();
      },
    );

    const esperItems: Array<EsperItem[]> = Array.from(
      Array(faker.random.number(100)),
    ).map(() => {
      return headers.map((key: string, i: number) => {
        let value: string;
        if (i % 3 === 0) {
          value = faker.random.word();
        } else if (i % 2 === 0) {
          value = faker.random.words();
        } else {
          value = `${faker.random.number()}`;
        }
        return { key, value } as EsperItem;
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
    const monitors: IMonitor[] = this.multipleMonitors();
    return { monitors };
  }
}
