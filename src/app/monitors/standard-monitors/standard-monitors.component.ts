import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, IAction, ICategory, Status } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-standard-monitors',
  templateUrl: './standard-monitors.component.html',
  styleUrls: ['./standard-monitors.component.scss'],
})
export class StandardMonitorsComponent implements OnInit {
  standardMonitors: IMonitor[] = [];
  allCurrentActions: IAction[];
  allCurrentCategories: ICategory[];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(private monitorsService: MonitorsService) {}

  ngOnInit(): void {
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
}
