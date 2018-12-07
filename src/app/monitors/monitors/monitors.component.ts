import { Component, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {
  monitors: IMonitor[] = [];

  @ViewChild(OverviewTableComponent)
  overviewTable: OverviewTableComponent;

  constructor(private monitorsService: MonitorsService) {
    this.monitorsService.getMonitors().subscribe((monitors: IMonitor[]) => {
      this.monitors = monitors;
    });
  }

  public searchMonitors(searchTerm: string): void {
    this.overviewTable.searchMonitors(searchTerm);
  }
}
