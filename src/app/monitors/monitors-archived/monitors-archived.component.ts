import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonitor } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-monitors-archived',
  templateUrl: './monitors-archived.component.html',
  styleUrls: ['./monitors-archived.component.scss'],
})
export class MonitorsArchivedComponent implements OnInit {
  archivedMonitors: IMonitor[] = [];
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
      .getArchivedMonitors()
      .subscribe((monitors: IMonitor[]) => {
        this.archivedMonitors = monitors;

        this.allCurrentCategories = this.monitorsService.allCurrentCategories(
          this.archivedMonitors,
        );

        this.allCurrentActions = this.monitorsService.allCurrentActions(
          this.archivedMonitors,
        );
      });
  }
}
