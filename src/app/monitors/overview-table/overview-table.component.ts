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

  filteredMonitors: IMonitor[] = [];

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

  @Input()
  allCurrentCategories: ICategory[];
  categories: string[];
  categoriesControl = new FormControl();
  selectedCategories: string[] = [];

  filterValues = {
    searchTerm: '',
    selectedActions: {
      block: [],
      store: [],
      email: [],
      other: [],
    },
    selectedCategories: [],
  };

  constructor(private monitorsService: MonitorsService) {}

  ngOnInit(): void {
    this.filteredMonitors = this.monitors;
    this.dataSource = new MatTableDataSource(this.monitors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (monitor) => monitor.name;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.filterPredicate();

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

  private filterPredicate(): (monitor: IMonitor, filter: string) => boolean {
    return (monitor: IMonitor, filter: string): boolean => {
      const { searchTerm, selectedActions, selectedCategories } = JSON.parse(
        filter,
      );

      const matchesSearchTerm: boolean = this.monitorsService.matchesSearchTerm(
        monitor,
        searchTerm,
      );
      const hasSelectedCategories: boolean = this.monitorsService.hasCategories(
        monitor,
        selectedCategories,
      );
      const hasSelectedActions: boolean = this.monitorsService.hasActions(
        monitor,
        Object.keys(selectedActions).reduce(
          (prev: string[], curr: string) => [...prev, ...selectedActions[curr]],
          [],
        ),
      );

      return matchesSearchTerm && hasSelectedCategories && hasSelectedActions;
    };
  }

  public filterMonitors(): void {
    // this.filterValues.selectedActions = Object.values(
    //   this.selectedActions,
    // ).reduce((prev, curr) => [...prev, ...curr], []);

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  public clearAllFilters(): void {
    this.filterValues.selectedActions = {
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

  public toggleOnlineOffline(value: string) {
    console.log({ value });
  }
}
