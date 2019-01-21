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
import { ArchiveMonitorDialogComponent } from '../archive-monitor-dialog/archive-monitor-dialog.component';
import { MonitorsService } from '../monitors.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { UnarchiveMonitorDialogComponent } from '../unarchive-monitor-dialog/unarchive-monitor-dialog.component';

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
    status: 'all',
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
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.monitors;
    }
  }

  public filterMonitors(): void {
    this.dataSource.filter = JSON.stringify(this.filterValues);
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
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  public archiveMonitor(id: number) {
    const monitor: IMonitor = this.monitors.find((m: IMonitor) => m.id === id);
    const dialogRef = this.dialog.open(ArchiveMonitorDialogComponent, {
      data: { monitor },
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
    const dialogRef = this.dialog.open(UnarchiveMonitorDialogComponent, {
      data: { monitor },
    });

    dialogRef.afterClosed().subscribe((newStatus: string) => {
      if (!newStatus) {
        return;
      }

      const status: MonitorStatus = newStatus as MonitorStatus;
      const body = { status } as IMonitor;

      this.monitorsService.patchMonitor(monitor.id, body).subscribe(
        () => {
          this.refresh.emit();
          this.snackBar.open(
            `Monitor ${monitor.name} unarchived, now ${newStatus}`,
            '',
            {
              duration: 2000,
            },
          );
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
    const dialogRef = this.dialog.open(ArchiveMonitorDialogComponent, {
      data: { monitor },
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
}
