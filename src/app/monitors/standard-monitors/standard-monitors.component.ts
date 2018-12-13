import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, IAction, ICategory, MonitorStatus } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-standard-monitors',
  templateUrl: './standard-monitors.component.html',
  styleUrls: ['./standard-monitors.component.scss'],
})
export class StandardMonitorsComponent implements OnInit {
  standardMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(private monitorsService: MonitorsService) {}

  ngOnInit(): void {
    this.getMonitors();
  }

  private getMonitors(): void {
    this.monitorsService
      .getStandardMonitors()
      .subscribe((monitors: IMonitor[]) => {
        this.standardMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );

        this.allCurrentCategories = this.monitorsService.allCurrentCategories(
          this.standardMonitors,
        );

        this.allCurrentActions = this.monitorsService.allCurrentActions(
          this.standardMonitors,
        );
      });
  }
}
