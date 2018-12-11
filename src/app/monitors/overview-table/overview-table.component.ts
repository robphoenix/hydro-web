import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IMonitor, IAction, ICategory } from '../monitor';
import { FormControl } from '@angular/forms';
import { MonitorsService } from '../monitors.service';
import { MultipleSelectComponent } from 'src/app/shared/multiple-select/multiple-select.component';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss'],
})
export class OverviewTableComponent implements OnInit {
  @Input()
  monitors: IMonitor[];

  dataSource: MatTableDataSource<IMonitor>;

  displayedColumns = ['monitor', 'actions', 'categories', 'menu'];

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  @ViewChild(MatSort)
  private sort: MatSort;

  @ViewChildren(MultipleSelectComponent)
  private selects: MultipleSelectComponent[];

  @Input()
  allCurrentActions: IAction[];

  actionGroups: { [group: string]: string[] } = {
    block: [],
    store: [],
    email: [],
    other: [],
  };
  blockControl = new FormControl();
  storeControl = new FormControl();
  emailControl = new FormControl();
  otherControl = new FormControl();
  selectedActions: { [group: string]: string[] } = {
    block: [],
    store: [],
    email: [],
    other: [],
  };
  @Input()
  allCurrentCategories: ICategory[];
  categories: string[];
  categoriesControl = new FormControl();
  selectedCategories: string[] = [];

  constructor(private monitorsService: MonitorsService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.monitors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (monitor) => monitor.name;
    this.dataSource.sort = this.sort;

    this.allCurrentActions.map((action: IAction) => {
      this.actionGroups[action.group] = [
        ...this.actionGroups[action.group],
        action.name,
      ].sort();
    });

    this.categories = this.allCurrentCategories
      .map((category: ICategory) => category.name)
      .sort();
  }

  public searchMonitors(searchTerm: string): void {
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  public filterMonitors(): void {
    const selectedActions = Object.values(this.selectedActions).reduce(
      (prev, curr) => [...prev, ...curr],
      [],
    );

    let filtered: IMonitor[] = this.monitors;
    if (selectedActions.length) {
      filtered = this.monitorsService.filterActions(filtered, selectedActions);
    }
    if (this.selectedCategories.length) {
      filtered = this.monitorsService.filterCategories(
        filtered,
        this.selectedCategories,
      );
    }
    this.dataSource.data = filtered;
  }

  public clearAllFilters(): void {
    this.selectedActions = {
      block: [],
      store: [],
      email: [],
      other: [],
    };
    this.selectedCategories = [];
    this.dataSource.data = this.monitors;
    this.selects.forEach((select: MultipleSelectComponent) =>
      select.clearSelectedOptions(),
    );
  }
}
