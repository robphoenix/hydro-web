import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IMonitor } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatTableDataSource,
  MatDialog,
  MatSort,
  Sort,
  MatPaginator,
} from '@angular/material';
import {
  IMonitorDataAttributes,
  IMonitorDisplayData,
  IHeadersMetadata,
  MonitorDataAttributeType,
  MonitorChangeEvent,
} from '../monitor-data';
import { EplQueryDialogComponent } from '../epl-query-dialog/epl-query-dialog.component';
import { EventbusService } from '../eventbus.service';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ChangeEventDialogComponent } from '../change-event-dialog/change-event-dialog.component';
import { SortService } from '../sort.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { AuthService } from 'src/app/user/auth.service';
import { TitleService } from 'src/app/shared/title.service';
import { Title } from '@angular/platform-browser';

/**
 * Describes a single monitor.
 *
 * @export
 * @class MonitorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'hydro-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit, OnDestroy {
  public monitorDataAttributeType: typeof MonitorDataAttributeType = MonitorDataAttributeType;
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
  public timeLiveDataReceived: Date;
  public allowsEdit: boolean;

  @ViewChild(MatSort)
  private sort: MatSort;

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private monitorService: MonitorsService,
    private eventbusService: EventbusService,
    public dialog: MatDialog,
    private sortService: SortService,
    private authService: AuthService,
    private titleService: TitleService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.titleService.title(`Monitor`));
    this.allowsEdit = this.authService.allowsEdit;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getMonitor();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.eventbusService.closeConnections();
  }

  private changeEventMessage(changeEvent: MonitorChangeEvent): string {
    switch (changeEvent) {
      case MonitorChangeEvent.CacheWindowChanged:
        return 'The monitor cache window has been changed by another user.';
      case MonitorChangeEvent.EplUpdated:
        return 'The monitor EPL Query has been changed by another user.';
      case MonitorChangeEvent.Offline:
        return 'The monitor status has been changed to offline by another user.';
      case MonitorChangeEvent.Online:
        return 'The monitor status has been changed to offline by another user.';
      case MonitorChangeEvent.Removed:
        return 'The monitor has been archived by another user.';
    }
  }

  getChangeEvents() {
    this.eventbusService
      .getChangeEvents(this.monitor.name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (message: MonitorChangeEvent) => {
          const dialogRef = this.dialog.open(ChangeEventDialogComponent, {
            data: { message: this.changeEventMessage(message) },
          });
          dialogRef.afterClosed().subscribe(() => {
            if (message === MonitorChangeEvent.Removed) {
              this.router.navigateByUrl('/monitors');
            } else {
              window.location.reload();
            }
          });
        },
        (error: IErrorMessage) => {
          console.log({ error });
        },
      );
  }

  /**
   * Gets the live data from the eventbus and displays it in the table
   *
   * @memberof MonitorComponent
   */
  getLiveData() {
    this.liveDataMessage = 'Currently waiting for live data';
    this.eventbusService
      .getLiveData(this.monitor.name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (message: IMonitorDisplayData) => {
          this.timeLiveDataReceived = new Date();
          const { data } = message;
          this.liveData = data;
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
      .getCachedData(this.monitor.name)
      .pipe(first()) // this is only going to return once
      .subscribe(
        (message: IMonitorDisplayData) => {
          const { data } = message;
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
   * Get details about the monitor itself.
   *
   * @memberof MonitorComponent
   */
  private getMonitor() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.editLink = `/monitors/${id}/edit`;
      this.monitorService.getMonitorById(id).subscribe(
        (monitor) => {
          this.title.setTitle(this.titleService.title(monitor.name));
          this.monitor = monitor;
          this.getCachedData();
          this.getLiveData();
          this.getChangeEvents();
        },
        (error: IErrorMessage) => {
          const { message, cause, uuid } = error;
          const title = `Error fetching monitor`;

          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause, uuid },
            maxWidth: `800px`,
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigateByUrl(`/monitors/view`);
          });
        },
      );
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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    const sorted = this.sortService.sortMonitorData(
      this.dataSource.data.slice(),
      sort,
      this.headersMetadata,
    );
    this.dataSource = new MatTableDataSource(sorted);
  }
}
