import { MonitorData } from './../monitor-data';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit {
  monitor: IMonitor;
  data: Array<{ [key: string]: string }>;
  headers: string[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private monitorService: MonitorsService,
  ) {}

  ngOnInit() {
    this.getMonitor();
    this.getMonitorData();
  }

  getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.monitorService.getLiveMonitorById(id).subscribe((monitor) => {
        this.monitor = monitor;
      });
    });
  }

  getMonitorData() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.monitorService
        .getMonitorDataById(id)
        .subscribe((data: MonitorData) => {
          this.headers = ['Time', ...data.headers];
          this.data = data.esperItems.map((items) => {
            const things: { [key: string]: string } = {
              Time: data.timeStamp,
            };
            items.forEach((item) => {
              things[item['key']] = item['value'];
            });
            return things;
          });
        });
    });
  }

  goBack() {
    this.location.back();
  }
}
