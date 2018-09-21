import { Component, OnInit } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { LiveMonitor } from './monitor';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss']
})
export class MonitorsComponent implements OnInit {
  liveMonitors: LiveMonitor[];

  constructor(private monitorService: MonitorsService) {}

  ngOnInit() {
    this.getLiveMonitors();
  }

  getLiveMonitors() {
    this.monitorService.getLiveMonitors().subscribe(monitors => {
      this.liveMonitors = monitors;
    });
  }
}
