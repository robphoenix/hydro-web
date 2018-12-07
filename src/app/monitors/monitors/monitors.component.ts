import { Component, ViewChild } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor, Status } from '../monitor';
import { OverviewTableComponent } from '../overview-table/overview-table.component';
import { map } from 'rxjs/operators';

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
    this.monitorsService
      .getStandardMonitors()
      .pipe(
        map((monitors: IMonitor[]) =>
          monitors.filter(
            (monitor: IMonitor) => monitor.status !== Status.Archived,
          ),
        ),
      )
      .subscribe((monitors: IMonitor[]) => {
        this.monitors = monitors;
      });
  }

  public searchMonitors(searchTerm: string): void {
    this.overviewTable.searchMonitors(searchTerm);
  }
}
