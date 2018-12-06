import { Component } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { IMonitor } from '../monitor';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {
  monitors: IMonitor[] = [];

  constructor(private monitorsService: MonitorsService) {
    this.monitorsService
      .getMonitors()
      .subscribe((monitors: IMonitor[]) => (this.monitors = monitors));
  }
}
