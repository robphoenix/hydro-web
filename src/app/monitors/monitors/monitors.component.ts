import { Component, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, Status, IAction, ICategory } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {
  standardMonitors: IMonitor[] = [];
  allCurrentActions: IAction[];
  allCurrentCategories: ICategory[];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(private monitorsService: MonitorsService) {
    this.getMonitors();
    this.getAllCurrentActions();
    this.getAllCurrentCategories();
  }

  private getMonitors(): void {
    this.monitorsService
      .getStandardMonitors()
      .subscribe((monitors: IMonitor[]) => {
        this.standardMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== Status.Archived,
        );
      });
  }

  private getAllCurrentActions(): void {
    this.monitorsService
      .getAllCurrentActions()
      .subscribe((actions: IAction[]) => {
        this.allCurrentActions = actions;
      });
  }

  private getAllCurrentCategories(): void {
    this.monitorsService
      .getAllCurrentCategories()
      .subscribe((categories: ICategory[]) => {
        this.allCurrentCategories = categories;
      });
  }

  public searchMonitors(searchTerm: string): void {
    this.overviewTable.searchMonitors(searchTerm);
  }
}
