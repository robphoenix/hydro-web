import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  OnDestroy,
} from '@angular/core';
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
  private outputAddress = 'result.pub.output';
  private eb: EventBus.EventBus;
  private eventbusHeaders: { [key: string]: any } = {};

  public monitor: IMonitor;
  public editLink: string;
  public dataSource: MatTableDataSource<IMonitorDataAttributes>;
  public displayedColumns: string[];
  public monitorData: IMonitorDataAttributes[] = [];
  public paused = false;

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  @ViewChild(MatSort)
  private sort: MatSort;

  constructor(
    private route: ActivatedRoute,
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

  /**
   * Toggles the eventbus connection on and off
   *
   * @memberof MonitorComponent
   */
  public togglePause() {
    if (this.paused) {
      this.eb = new EventBus(this.eventBusUrl);
      this.registerOutputHandler();
    } else {
      this.eb.close();
    }
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
        const name = monitor.name;
        console.log({ name });

        this.registerOutputHandler();
      });
    });
  }

  /**
   * Subscribe to the eventbus messages for the current monitor
   *
   * @private
   * @memberof MonitorComponent
   */
  private registerOutputHandler() {
    this.eb.enableReconnect(true);
    const address = `${this.outputAddress}.${this.monitor.name}`;
    this.eb.onerror = () => console.log('erorrrr');
    this.eb.onclose = () => console.log('closed');

    this.eb.onopen = () => {
      this.eb.send(
        'result.pub.cached',
        this.monitor.name,
        this.eventbusHeaders,
        (error, reply) => {
          if (reply) {
            this.displayMessageData(reply);
          }
          if (error) {
            console.log({ error });
          }
        },
      );

      this.eb.registerHandler(
        address,
        this.eventbusHeaders,
        (error, message: IMonitorData) => {
          if (error) {
            console.error({ error });
          }
          this.displayMessageData(message);
        },
      );
    };
  }

  /**
   * Display the Monitor data in the table
   *
   * @param {IMonitorData} message
   * @memberof MonitorComponent
   */
  displayMessageData(message: IMonitorData) {
    const { body } = message;
    const { h: headers, d: data } = body;

    this.displayedColumns = headers.map((header) => {
      const { n: name } = header;
      return name;
    });

    this.monitorData = data.map((attributes: (string | number | boolean)[]) => {
      return attributes.reduce(
        (prev: {}, curr: string | number | boolean, i: number) => {
          prev[this.displayedColumns[i]] = curr;
          return prev;
        },
        {},
      );
    });

    this.dataSource.data = this.monitorData;
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
}
