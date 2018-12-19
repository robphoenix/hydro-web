import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, MonitorStatus } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-monitors-system',
  templateUrl: './monitors-system.component.html',
  styleUrls: ['./monitors-system.component.scss'],
})
export class MonitorsSystemComponent implements OnInit {
  currentPage = 'system';
  pageLinks: string[] = ['archived', 'standard'];
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
