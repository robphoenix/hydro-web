import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { IMonitor } from './monitors/monitor';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  singleMonitor(): IMonitor {
    return {
      id: faker.random.uuid(),
      topic: faker.random.words(),
      queryBody: faker.lorem.paragraph(),
      queryDescription: faker.lorem.sentence(),
      dateCreated: faker.date.past(),
      categories: [
        {
          id: faker.random.uuid(),
          value: faker.random.word(),
          dateCreated: faker.date.past(),
        },
        {
          id: faker.random.uuid(),
          value: faker.random.word(),
          dateCreated: faker.date.past(),
        },
      ],
    } as IMonitor;
  }

  multipleMonitors(): IMonitor[] {
    return Array.from(Array(faker.random.number(100))).map(() => {
      return this.singleMonitor();
    });
  }

  createDb() {
    const monitors: IMonitor[] = this.multipleMonitors();
    console.log({ monitors });

    return { monitors };
  }
}
