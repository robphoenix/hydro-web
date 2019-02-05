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
} from '@angular/material';
import { IMonitor, MonitorType, MonitorStatus } from '../monitor';
import { FormControl } from '@angular/forms';
import { MultipleSelectComponent } from 'src/app/shared/multiple-select/multiple-select.component';
import { FilterService } from '../filter.service';
import { MonitorsService } from '../monitors.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MonitorStatusChangeDialogComponent } from '../monitor-status-change-dialog/monitor-status-change-dialog.component';
import { EplQueryDialogComponent } from '../epl-query-dialog/epl-query-dialog.component';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss'],
})
export class OverviewTableComponent implements OnInit, OnChanges {
  @Input()
  monitors: IMonitor[];

  @Input()
  canToggleStatus = true;

  @Input()
  monitorType: MonitorStatus | MonitorType;

  dataSource: MatTableDataSource<IMonitor>;
  displayedColumns = ['monitor', 'actions', 'categories', 'menu'];

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  @ViewChild(MatSort)
  private sort: MatSort;

  @ViewChildren(MultipleSelectComponent)
  private selects: MultipleSelectComponent[];

  @Input()
  allCurrentActions: { [group: string]: string[] };

  blockControl = new FormControl();
  storeControl = new FormControl();
  emailControl = new FormControl();
  otherControl = new FormControl();

  @Input()
  allCurrentCategories: string[];
  categoriesControl = new FormControl();

  @Input()
  initialStatus = 'all';

  @Output()
  refresh = new EventEmitter();

  filterValues = {
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
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.monitors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (monitor) => monitor.name;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterService.filterPredicate();
    this.filterValues.status = this.initialStatus;
    this.filterMonitors();
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.monitors;
    }
  }

  public filterMonitors(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  public showAllMonitors(): void {
    this.filterValues.status = 'all';
    this.filterMonitors();
  }

  public hasFilters(): boolean {
    const hasActionsFilters = Object.values(
      this.filterValues.selectedActions,
    ).every((actions: string[]) => !actions.length);

    return hasActionsFilters && !this.filterValues.selectedCategories.length;
  }

  public hasActions(group?: string): boolean {
    if (!group) {
      return Object.values(this.allCurrentActions).every(
        (curr: string[]) => !!curr.length,
      );
    }
    const actions = this.allCurrentActions[group];
    return actions && actions.length > 0;
  }

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

  public toggleStatus(value: string) {
    this.filterValues.status = value;
    this.filterMonitors();
  }

  public archiveMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `archive`;
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
        (err) => {
          const title = 'archive monitor error';
          this.dialog.open(ErrorDialogComponent, {
            data: { title, err },
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
        (err) => {
          console.log({ err });

          const title = 'unarchive monitor error';
          this.dialog.open(ErrorDialogComponent, {
            data: { title, err },
          });
        },
      );
    });
  }

  public enableMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `enable`;
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
          this.snackBar.open(`Monitor ${monitor.name} enabled`, '', {
            duration: 2000,
          });
        },
        (err) => {
          const title = 'archive monitor error';
          this.dialog.open(ErrorDialogComponent, {
            data: { title, err },
          });
        },
      );
    });
  }

  public disableMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const action = `disable`;
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
          this.snackBar.open(`Monitor ${monitor.name} disabled`, '', {
            duration: 2000,
          });
        },
        (err) => {
          const title = 'archive monitor error';
          this.dialog.open(ErrorDialogComponent, {
            data: { title, err },
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
