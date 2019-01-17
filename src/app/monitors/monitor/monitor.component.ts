import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Location } from '@angular/common';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
import * as EventBus from 'vertx3-eventbus-client';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSort,
} from '@angular/material';
import {
  IMonitorDataAttributes,
  IMonitorData,
  IMonitorDataMessage,
} from '../monitor-data';
import { EplQueryDialogComponent } from '../epl-query-dialog/epl-query-dialog.component';

/**
 * Describes a single monitor.
 *
 * @export
 * @class MonitorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit, OnChanges, OnDestroy {
  private eventBusUrl = 'http://mn2formlt0002d0:6081/eventbus';
  private eventBusAddress = 'result.pub.output';
  private eb: EventBus.EventBus;
  private headers: { [key: string]: any } = {};

  monitor: IMonitor;
  dataSource: MatTableDataSource<IMonitorDataAttributes>;
  displayedColumns: string[];
  attributes: IMonitorDataAttributes[] = [];
  c = 0;

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  @ViewChild(MatSort)
  private sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private monitorService: MonitorsService,
    public dialog: MatDialog,
  ) {
    this.eb = new EventBus(this.eventBusUrl);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.attributes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getMonitor();
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.attributes;
    }
  }

  ngOnDestroy(): void {
    this.eb.close();
  }

  /**
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.monitorService.getMonitor(id).subscribe((monitor) => {
        this.monitor = monitor;
        this.subscribe();
      });
    });
  }

  subscribe() {
    this.eb.onopen = () => {
      this.eb.registerHandler(
        this.eventBusAddress,
        this.headers,
        (error, data: IMonitorData) => {
          if (error) {
            console.error(error);
          }

          if (this.c > 1) {
            return;
          }
          this.c++;
          const messages: IMonitorDataMessage[] = data.body.messages;

          if (!this.displayedColumns) {
            this.displayedColumns = Object.keys(messages[0].attributes);
          }

          this.attributes = messages.map(
            (message: IMonitorDataMessage) => message.attributes,
          );
          this.dataSource.data = this.attributes;

          console.log(data);
        },
      );
    };
  }

  showEpl() {
    this.dialog.open(EplQueryDialogComponent, {
      data: { monitor: this.monitor },
      width: '1000px',
    });
  }

  /**
   * Navigates to the previous URL.
   *
   * @memberof MonitorComponent
   */
  goBack() {
    this.location.back();
  }
}
