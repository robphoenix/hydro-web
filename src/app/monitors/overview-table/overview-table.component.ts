import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSnackBar,
  MatDialog,
  Sort,
} from '@angular/material';
import { IMonitor, MonitorType, MonitorStatus } from '../monitor';
import { FormControl } from '@angular/forms';
import { MultipleSelectComponent } from 'src/app/shared/multiple-select/multiple-select.component';
import { FilterService } from '../filter.service';
import { MonitorsService } from '../monitors.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MonitorStatusChangeDialogComponent } from '../monitor-status-change-dialog/monitor-status-change-dialog.component';
import { EplQueryDialogComponent } from '../epl-query-dialog/epl-query-dialog.component';
import { UserService } from 'src/app/user/user.service';
import { IErrorMessage } from 'src/app/shared/error-message';
import { Router } from '@angular/router';
import { SortService } from '../sort.service';

interface IFilterValues {
  searchTerm: string;
  selectedActions: { [action: string]: string[] };
  selectedCategories: string[];
  status: string;
}

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss'],
})
export class OverviewTableComponent implements OnInit, OnChanges {
  @Input()
  monitors: IMonitor[];

  @Input()
  canToggleStatus: boolean;

  @Input()
  monitorsType: MonitorStatus | MonitorType;

  public dataSource: MatTableDataSource<IMonitor>;
  public displayedColumns = ['monitor', 'actions', 'categories', 'menu'];

  // @ViewChild(MatPaginator)
  // private paginator: MatPaginator;

  // @ViewChild(MatSort)
  // private sort: MatSort;

  @ViewChildren(MultipleSelectComponent)
  private selects: MultipleSelectComponent[];

  // @Input()
  // allCurrentActions: { [group: string]: string[] };

  blockControl = new FormControl();
  storeControl = new FormControl();
  emailControl = new FormControl();
  otherControl = new FormControl();

  @Input()
  allCurrentCategories: string[];
  categoriesControl = new FormControl();

  @Output()
  refresh = new EventEmitter();

  @Output()
  changeMonitorsType = new EventEmitter<string>();

  public filterValues: IFilterValues = {
    searchTerm: '',
    selectedActions: {
      block: [],
      store: [],
      email: [],
      other: [],
    },
    selectedCategories: [],
    status: '',
  };

  constructor(
    private filterService: FilterService,
    private monitorsService: MonitorsService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private sortService: SortService,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.monitors);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterService.filterPredicate();
    this.updateMonitorsStatus();
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.monitors;
      this.updateMonitorsStatus();
    }
  }

  public sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const sorted = this.sortService.sortMonitors(
      this.dataSource.data.slice(),
      sort,
    );
    this.dataSource.data = sorted;
  }

  private get isCurrentlyArchivedMonitors() {
    return this.monitorsType === MonitorStatus.Archived;
  }

  public updateMonitorsStatus() {
    this.monitorsStatus = this.isCurrentlyArchivedMonitors
      ? 'all'
      : this.userService.lastMonitorsStatus || 'all';
  }

  public get monitorsStatus(): string {
    return this.filterValues.status;
  }

  public set monitorsStatus(status: string) {
    this.filterValues.status = status;
    this.filterMonitors();
    if (!this.isCurrentlyArchivedMonitors) {
      this.userService.lastMonitorsStatus = status;
    }
  }

  public toggleStatus(status: string) {
    this.filterValues.status = status;
    this.filterMonitors();
    if (!this.isCurrentlyArchivedMonitors) {
      this.userService.lastMonitorsStatus = status;
    }
  }

  public filterMonitors(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  public showAllMonitors(): void {
    this.monitorsStatus = 'all';
  }

  public hasFilters(): boolean {
    const hasActionsFilters = Object.values(
      this.filterValues.selectedActions,
    ).every((actions: string[]) => !actions.length);

    return hasActionsFilters && !this.filterValues.selectedCategories.length;
  }

  // public hasActions(group?: string): boolean {
  //   const anyCurrentActions: boolean =
  //     Object.entries(this.allCurrentActions).length > 0;
  //   if (!anyCurrentActions) {
  //     return false;
  //   }

  //   if (!group) {
  //     return Object.values(this.allCurrentActions).every(
  //       (curr: string[]) => !!curr.length,
  //     );
  //   }

  //   const actions = this.allCurrentActions[group];
  //   return actions && actions.length > 0;
  // }

  public clearAllFilters(): void {
    this.filterValues.selectedActions = {
      block: [],
      store: [],
      email: [],
      other: [],
    };
    this.filterValues.selectedCategories = [];
    this.filterMonitors();
    this.selects.forEach((select: MultipleSelectComponent) =>
      select.clearSelectedOptions(),
    );
  }

  public archiveMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `Archive`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((archive: boolean) => {
      if (!archive) {
        return;
      }
      const body = { status: MonitorStatus.Archived } as IMonitor;
      this.monitorsService.patchMonitor(monitor.id, body).subscribe(
        () => {
          this.refresh.emit();
          this.snackBar.open(`Monitor ${monitor.name} archived`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public unArchiveMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `unarchive`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((unarchive: boolean) => {
      if (!unarchive) {
        return;
      }

      const body = { status: MonitorStatus.Offline } as IMonitor;

      this.monitorsService.patchMonitor(monitor.id, body).subscribe(
        () => {
          this.refresh.emit();
          this.snackBar.open(`Monitor ${monitor.name} unarchived`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'unarchive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public enableMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `Enable`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((enable: boolean) => {
      if (!enable) {
        return;
      }
      const body = { status: MonitorStatus.Online } as IMonitor;
      this.monitorsService.patchMonitor(monitor.id, body).subscribe(
        () => {
          this.refresh.emit();
          this.monitorsStatus = 'online';
          this.snackBar.open(`Monitor ${monitor.name} enabled`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public disableMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `Disable`;
    const dialogRef = this.dialog.open(MonitorStatusChangeDialogComponent, {
      data: { monitor, action },
    });

    dialogRef.afterClosed().subscribe((disable: boolean) => {
      if (!disable) {
        return;
      }
      const body = { status: MonitorStatus.Offline } as IMonitor;
      this.monitorsService.patchMonitor(monitor.id, body).subscribe(
        () => {
          this.refresh.emit();
          this.monitorsStatus = 'offline';
          this.snackBar.open(`Monitor ${monitor.name} disabled`, '', {
            duration: 2000,
          });
        },
        (err: IErrorMessage) => {
          const title = 'archive monitor error';
          const { message, cause } = err;
          this.dialog.open(ErrorDialogComponent, {
            data: { title, message, cause },
            maxWidth: `800px`,
          });
        },
      );
    });
  }

  public viewEplQuery(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    this.dialog.open(EplQueryDialogComponent, {
      data: { monitor },
      width: '1000px',
    });
  }
}
