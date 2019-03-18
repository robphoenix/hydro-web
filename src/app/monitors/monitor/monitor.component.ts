import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSort,
  Sort,
} from '@angular/material';
import {
  IMonitorDataAttributes,
  IMonitorDisplayData,
  IHeadersMetadata,
  MonitorDataAttribute,
  MonitorDataAttributeType,
} from '../monitor-data';
import { EplQueryDialogComponent } from '../epl-query-dialog/epl-query-dialog.component';
import { EventbusService } from '../eventbus.service';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IErrorMessage } from 'src/app/shared/error-message';
import * as EventBus from 'vertx3-eventbus-client';

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
export class MonitorComponent implements OnInit, OnDestroy {
  MonitorDataAttributeType: typeof MonitorDataAttributeType = MonitorDataAttributeType;
  private name: string;
  private unsubscribe: Subject<void> = new Subject();

  public monitor: IMonitor;
  public editLink: string;
  public dataSource: MatTableDataSource<IMonitorDataAttributes>;
  public displayedColumns: string[];
  public headersMetadata: IHeadersMetadata;
  public paused = false;
  public cachedDataMessage = '';
  public liveDataMessage = '';
  public liveData: IMonitorDataAttributes[] = [];
  public dataType = '';

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  @ViewChild(MatSort)
  private sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private monitorService: MonitorsService,
    private eventbusService: EventbusService,
    public dialog: MatDialog,
  ) {
    // if we get this from the url params we don't have to wait for the server
    // to send back the monitor info, though to be honest I'm not sure this
    // gives us much gain in time to display data.
    this.name = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCachedData();
    this.getMonitor();
    this.getLiveData();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.eventbusService.closeConnections();
  }

  /**
   * Gets the live data from the eventbus and displays it in the table
   *
   * @memberof MonitorComponent
   */
  getLiveData() {
    this.liveDataMessage = 'Currently waiting for live data';
    this.eventbusService
      .getLiveData(this.name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (message: IMonitorDisplayData) => {
          const { data } = message;
          this.liveData = data;
          console.log('live data...');
          console.log({ data });

          this.displayMessageData(message, 'live');
        },
        (error: IErrorMessage) => {
          const { message } = error;
          this.liveDataMessage = `error requesting live data: ${message}`;
          console.log({ error });
        },
      );
  }

  /**
   * Gets the cached data from the eventbus and displays it in the table
   *
   * @memberof MonitorComponent
   */
  getCachedData() {
    this.cachedDataMessage = 'Requesting cached data';
    this.eventbusService
      .getCachedData(this.name)
      .pipe(first()) // this is only going to return once
      .subscribe(
        (message: IMonitorDisplayData) => {
          const { data } = message;
          console.log('cached data...');

          console.log({ data });
          if (!data.length) {
            this.cachedDataMessage = 'There is no cached data available';
          }

          this.displayMessageData(message, 'cached');
        },
        (error: IErrorMessage) => {
          const { message } = error;
          this.cachedDataMessage = `error requesting cached data: ${message}`;
          console.log({ error });
        },
      );
  }

  /**
   * Toggles the eventbus connections on and off
   *
   * @memberof MonitorComponent
   */
  public togglePause() {
    this.paused ? this.getLiveData() : this.eventbusService.closeConnections();
    this.paused = !this.paused;
  }

  /**
   * Specifies the correct icon for whether the monitor is paused or not
   *
   * @readonly
   * @type {string}
   * @memberof MonitorComponent
   */
  public get pauseIcon(): string {
    return this.paused ? 'play_arrow' : 'pause';
  }

  /**
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  private getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.editLink = `/monitors/${id}/edit`;
      this.monitorService.getMonitorById(id).subscribe((monitor) => {
        this.monitor = monitor;
      });
    });
  }

  /**
   * Display the Monitor data in the table
   *
   * @param {IMonitorData} message
   * @memberof MonitorComponent
   */
  displayMessageData(message: IMonitorDisplayData, dataType: string) {
    if (!message) {
      return;
    }

    const { headers, headersMetadata, data } = message;

    if (!data.length) {
      return;
    }

    this.dataType = dataType;
    this.headersMetadata = headersMetadata;
    this.displayedColumns = headers;
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Open a dialog that displays the current monitor's EPL Query
   *
   * @memberof MonitorComponent
   */
  public showEpl() {
    this.dialog.open(EplQueryDialogComponent, {
      data: { monitor: this.monitor },
      width: '1000px',
    });
  }

  public sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const data = this.dataSource.data.slice();

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const type: string = this.headersMetadata[sort.active]
        ? this.headersMetadata[sort.active].type
        : '';

      switch (type) {
        case MonitorDataAttributeType.Ip:
          const ipA: string = a[sort.active] as string;
          const ipB: string = b[sort.active] as string;
          return this.compare(
            this.sortableIpAddress(ipA),
            this.sortableIpAddress(ipB),
            isAsc,
          );
        case MonitorDataAttributeType.DateTime:
          const dateA: Date = new Date(a[sort.active] as number);
          const dateB: Date = new Date(a[sort.active] as number);
          return this.compare(dateA, dateB, isAsc);
        case '':
          return this.compare(a[sort.active], b[sort.active], isAsc);
        default:
          return 0;
      }
    });
  }

  private sortableIpAddress(ip: string): string {
    return ip
      .split('.')
      .map((octet: string) => octet.padStart(3, '0'))
      .join('');
  }

  private compare(
    a: MonitorDataAttribute | Date,
    b: MonitorDataAttribute | Date,
    isAsc: boolean,
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
