import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { LiveMonitor } from '../monitors/monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  @Input()
  monitor: LiveMonitor;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private monitorService: MonitorsService
  ) {}

  ngOnInit() {
    this.getMonitor();
  }

  getMonitor() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.monitorService.getLiveMonitorById(id).subscribe(monitor => {
        this.monitor = monitor;
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
