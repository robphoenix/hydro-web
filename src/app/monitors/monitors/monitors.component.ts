import { Component, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, Status, IAction } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {
  standardMonitors: IMonitor[] = [];
  allCurrentActions: IAction[] = [];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(private monitorsService: MonitorsService) {
    this.getMonitors();
    this.getAllCurrentActions();
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

  public searchMonitors(searchTerm: string): void {
    this.overviewTable.searchMonitors(searchTerm);
  }
}
