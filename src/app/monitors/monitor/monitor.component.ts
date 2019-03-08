import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSort,
} from '@angular/material';
import { IMonitorDataAttributes, IMonitorDisplayData } from '../monitor-data';
import { EplQueryDialogComponent } from '../epl-query-dialog/epl-query-dialog.component';
import { EventbusService } from '../eventbus.service';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private name: string;
  private unsubscribe: Subject<void> = new Subject();

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
    private eventbusService: EventbusService,
    public dialog: MatDialog,
  ) {
    // if we get this from the url params we don't have to wait for the server
    // to send back the monitor info, though to be honest I'm not sure this
    // gives us much gain in time to display data.
    this.name = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.monitorData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCachedData();
    this.getMonitor();
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
    this.eventbusService
      .getLiveData(this.name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((message: IMonitorDisplayData) => {
        this.displayMessageData(message);
      });
  }

  /**
   * Gets the cached data from the eventbus and displays it in the table
   *
   * @memberof MonitorComponent
   */
  getCachedData() {
    this.eventbusService
      .getCachedData(this.name)
      .pipe(first()) // this is only going to return once
      .subscribe((message: IMonitorDisplayData) => {
        this.displayMessageData(message);
        this.getLiveData();
      });
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
  displayMessageData(message: IMonitorDisplayData) {
    if (!message) {
      return;
    }
    const { headers, data } = message;
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
}
