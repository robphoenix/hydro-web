import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { IMonitor, ICategory } from './monitors/monitor';
import { IMonitorData, IEsperItem } from './monitors/monitor';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  private ids: string[];

  private headers(): string[] {
    return Array.from(Array(faker.random.number({ min: 5, max: 7 }))).map(
      () => {
        return faker.random.word();
      },
    );
  }

  private esperItems(headers: string[]): Array<IEsperItem[]> {
    return Array.from(Array(faker.random.number({ min: 20, max: 100 }))).map(
      () => {
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
      },
    );
  }

  private monitorData(): IMonitorData[] {
    return this.ids.map((id: string) => {
      const timeStamp: Date = faker.date.recent();
      const headers: string[] = this.headers();
      const esperItems: Array<IEsperItem[]> = this.esperItems(headers);

      return {
        id,
        headers,
        timeStamp,
        esperItems,
      } as IMonitorData;
    });
  }

  private categories(): ICategory[] {
    const categoriesList: string[] = [
      'script-attack',
      'Mobile',
      'Sports Book',
      'JohnSnow',
      'BetSlip',
      'GavinEdwards',
      'Scrapers',
      'China Arbs',
      'bettingslip',
      'Extra',
      'FRM',
      'Alerts',
      'NewLoginDefault',
      'Members',
      'Monitor',
      'Blocking',
      'Investigation',
      'HoneyPot',
      'Publisher',
      'Datacenter',
      'LoginAttack',
      'Bookmaker',
      'hostingfacility',
      'geo',
      'Martin',
      'OpenAccount',
      'Ragbag',
    ];

    const usedCategories: string[] = Array.from(
      Array(faker.random.number({ min: 1, max: 3 })),
    ).map(
      () =>
        categoriesList[
          faker.random.number({
            min: 0,
            max: categoriesList.length - 1,
          })
        ],
    );

    return Array.from(new Set(usedCategories)).map((value) => {
      const [id, dateCreated] = [faker.random.uuid(), faker.date.past()];
      return { id, value, dateCreated } as ICategory;
    });
  }

  private monitors(): IMonitor[] {
    return this.ids.map((id: string) => {
      return {
        id,
        topic: faker.random.words(),
        queryBody: faker.lorem.paragraph(),
        queryDescription: faker.lorem.sentence(),
        dateCreated: faker.date.past(),
        categories: this.categories(),
      } as IMonitor;
    });
  }

  createDb() {
    this.ids = Array.from(
      Array(faker.random.number({ min: 30, max: 120 })),
    ).map(() => {
      return faker.random.uuid();
    });

    const monitors: IMonitor[] = this.monitors();
    const monitorsData: IMonitorData[] = this.monitorData();
    return { monitors, monitorsData };
  }
}
