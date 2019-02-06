import { Component, OnInit } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-monitors-archived',
  templateUrl: './monitors-archived.component.html',
  styleUrls: ['./monitors-archived.component.scss'],
})
export class MonitorsArchivedComponent implements OnInit {
  currentPage = 'archived';
  pageLinks: string[] = ['system', 'standard'];
  archivedMonitors: IMonitor[] = [];
  allCurrentActions: { [group: string]: string[] };
  allCurrentCategories: string[];

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

  refresh() {
    this.getMonitors();
  }
}
