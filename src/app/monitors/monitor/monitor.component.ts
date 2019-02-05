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
  editLink: string;
  dataSource: MatTableDataSource<IMonitorDataAttributes>;
  displayedColumns: string[];
  attributes: IMonitorDataAttributes[] = [];
  paused = false;

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

  pause() {
    this.paused = true;
    this.eb.close();
  }

  unpause() {
    this.eb = new EventBus(this.eventBusUrl);
    this.subscribe();
    this.paused = false;
  }

  togglePause() {
    if (this.paused) {
      this.eb = new EventBus(this.eventBusUrl);
      this.subscribe();
    } else {
      this.eb.close();
    }
    this.paused = !this.paused;
  }

  get pauseIcon(): string {
    return this.paused ? 'play_arrow' : 'pause';
  }

  /**
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.editLink = `/monitors/${id}/edit`;
      this.monitorService.getMonitor(id).subscribe((monitor) => {
        this.monitor = monitor;

        this.subscribe();
      });
    });
  }

  subscribe() {
    const address = `${this.eventBusAddress}.${this.monitor.name}`;

    this.eb.onopen = () => {
      this.eb.registerHandler(
        address,
        this.headers,
        (error, data: IMonitorData) => {
          if (error) {
            console.error(error);
          }

          const messages: IMonitorDataMessage[] = data.body.messages;

          if (!this.displayedColumns) {
            this.displayedColumns = Object.keys(messages[0].attributes);
          }

          this.attributes = messages.map(
            (message: IMonitorDataMessage) => message.attributes,
          );
          this.dataSource.data = this.attributes;
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
