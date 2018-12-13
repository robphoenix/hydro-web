import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, MonitorStatus } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-system-monitors',
  templateUrl: './system-monitors.component.html',
  styleUrls: ['./system-monitors.component.scss'],
})
export class SystemMonitorsComponent implements OnInit {
  systemMonitors: IMonitor[] = [];
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
      .getSystemMonitors()
      .subscribe((monitors: IMonitor[]) => {
        this.systemMonitors = monitors.filter(
          (monitor: IMonitor) => monitor.status !== MonitorStatus.Archived,
        );

        this.allCurrentCategories = this.monitorsService.allCurrentCategories(
          this.systemMonitors,
        );

        this.allCurrentActions = this.monitorsService.allCurrentActions(
          this.systemMonitors,
        );
      });
  }
}
