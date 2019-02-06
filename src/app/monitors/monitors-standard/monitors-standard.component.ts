import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor, MonitorStatus } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-monitors-standard',
  templateUrl: './monitors-standard.component.html',
  styleUrls: ['./monitors-standard.component.scss'],
})
export class MonitorsStandardComponent implements OnInit {
  currentPage = 'standard';
  pageLinks: string[] = ['archived', 'system'];
  standardMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(
    private monitorsService: MonitorsService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.lastMonitorsUrl = `/monitors/${this.currentPage}`;
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

  refresh() {
    this.getMonitors();
  }
}
