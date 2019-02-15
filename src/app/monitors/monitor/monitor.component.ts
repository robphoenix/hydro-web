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
import { IMonitorData, IMonitorDataAttributes } from '../monitor-data';
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
  private eventbusHeaders: { [key: string]: any } = {};

  monitor: IMonitor;
  editLink: string;
  dataSource: MatTableDataSource<IMonitorDataAttributes>;
  displayedColumns: string[];
  monitorData: IMonitorDataAttributes[] = [];
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
    this.dataSource = new MatTableDataSource(this.monitorData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getMonitor();
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.monitorData;
    }
  }

  ngOnDestroy(): void {
    this.eb.close();
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
      this.monitorService.getMonitorById(id).subscribe((monitor) => {
        this.monitor = monitor;
        const name = monitor.name;
        console.log({ name });
        this.subscribe();
      });
    });
  }

  subscribe() {
    this.eb.enableReconnect(true);
    const address = `${this.eventBusAddress}.${this.monitor.name}`;
    this.eb.onerror = () => console.log('erorrrr');
    this.eb.onclose = () => console.log('closed');

    this.eb.onopen = () => {
      this.eb.registerHandler(
        address,
        this.eventbusHeaders,
        (error, message: IMonitorData) => {
          if (error) {
            console.error({ error });
          }

          const { body } = message;
          const { h: headers, d: data } = body;

          this.displayedColumns = headers.map((header) => {
            const { n: name } = header;
            return name;
          });

          this.monitorData = data.map(
            (attributes: (string | number | boolean)[]) => {
              return attributes.reduce(
                (prev: {}, curr: string | number | boolean, i: number) => {
                  prev[this.displayedColumns[i]] = curr;
                  return prev;
                },
                {},
              );
            },
          );

          this.dataSource.data = this.monitorData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
