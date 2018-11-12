import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { IMonitor, ICategory, IGroup, IAction } from './monitors/monitor';
import { IMonitorData, IEsperItem } from './monitors/monitor';
import { MatGridList } from '@angular/material';

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

    const chosenCategories: string[] = Array.from(
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

    return Array.from(new Set(chosenCategories)).map((value) => {
      const [id, dateCreated] = [faker.random.uuid(), faker.date.past()];
      return { id, value, dateCreated } as ICategory;
    });
  }

  private groups(): IGroup[] {
    const groupsList: string[] = [
      'OTS',
      'FRM',
      'Infrastructure',
      'Forensic Monitoring',
      'Network Security',
    ];

    const chosenGroups: string[] = Array.from(
      Array(faker.random.number({ min: 1, max: 3 })),
    ).map(
      () =>
        groupsList[
          faker.random.number({
            min: 0,
            max: groupsList.length - 1,
          })
        ],
    );

    return Array.from(new Set(chosenGroups)).map((name) => {
      const id = faker.random.uuid();
      return { id, name } as IGroup;
    });
  }

  private actions(): IAction[] {
    const actionsList: string[] = [
      'Batch Example-1',
      'Block IP for 1 Hour',
      'Block Testing',
      'Multiple Logins Email Alert',
      'Block Range Permanently',
      'FRM - Email - Generic',
      'RollingMembers System callout to store results in R Studio',
      'Disable Multiple Monitors',
      'RollingMemberAuthenticated System callout to store results in R Studio',
      'RollingBettingslip System callout to store results in R Studio',
      'Block XForwardedFor for 30 minutes',
      'RollingMobile System callout to store results in R Studio',
      'Store Results in Database (General Purpose)',
      'RollingSportsbook Sytem callout to store results in R Studio',
      'System Monitor Only Store Call',
      'Block IP Permanently',
      'block sip 2 mins - Delay 20 seconds',
      'Block IP for 6 Hours',
      'Block for 24 hours',
      'Block stk or sip for 1 minute',
      'Block stk or sip for 2 hours',
      'Block stk 10 minutes',
      'Simple Log',
      'System Only Store Members Data',
      'Publisher Kill Sessions (24 Hrs)',
      'Block sip for 30 minutes',
      'Block IP for 48 Hours',
      'Block  Range for 10 minutes Delay 2m',
      'Block UserAgent for 30 mins',
      'Block UQID for 10 minutes',
      'Block IP Range For 3 hours',
      'Block IP for 3 Hours',
      'RStudio-Tim-Testing',
      'User has Created Manual Block',
      'User has Created or Edited a Monitor',
      'User has Enabled or Disabled a Monitor',
      'Publisher Client Kill',
      'Block sip for 10 minutes',
      'Email Test Service',
    ];

    const chosenActions: string[] = Array.from(
      Array(faker.random.number({ min: 1, max: 6 })),
    ).map(
      () =>
        actionsList[
          faker.random.number({
            min: 0,
            max: actionsList.length - 1,
          })
        ],
    );

    return Array.from(new Set(chosenActions)).map((name) => {
      const id = faker.random.uuid();
      return { id, name } as IAction;
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
        groups: this.groups(),
        actions: this.actions(),
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
