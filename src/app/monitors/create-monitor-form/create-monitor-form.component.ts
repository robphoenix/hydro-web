import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {
  ICategory,
  IAction,
  IGroup,
  IMonitor,
  LDAPGroup,
  MonitorPriority,
  MonitorStatus,
  MonitorType,
} from '../monitor';
import { MonitorsService } from '../monitors.service';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth.service';
import { FilterService } from '../filter.service';
import { Router } from '@angular/router';
import { IMonitorSubmit } from '../monitor-submit';
import { CacheWindowService } from '../cache-window.service';

@Component({
  selector: 'app-create-monitor-form',
  templateUrl: './create-monitor-form.component.html',
  styleUrls: ['./create-monitor-form.component.scss'],
})
export class CreateMonitorFormComponent implements OnInit {
  @Input()
  heading: string;

  @Input()
  monitor: IMonitor;

  @Input()
  monitorName: string;

  @Input()
  editForm: boolean;

  @Output()
  submitForm = new EventEmitter<IMonitorSubmit>();

  createMonitorForm: FormGroup;

  readonly defaultPriority = MonitorPriority.Mid;

  autocompleteOptions = {
    selectable: true,
    removable: true,
    addOnBlur: true,
    separatorKeysCodes: [ENTER, COMMA, SPACE],
  };

  availableCategories: ICategory[] = [];
  selectedCategories: ICategory[] = [];
  filteredCategories: Observable<ICategory[]>;
  loadingCategories = false;
  maxSelectedCategories = 4;
  placeholderCategories = 'Please select monitor categories';

  availableActions: { [group: string]: IAction[] } = {};

  availableGroups: IGroup[] = [];
  selectedGroups: IGroup[] = [];
  filteredGroups: Observable<IGroup[]>;
  loadingGroups = false;

  private nameMaxCharLength = 50;
  private controlsToBeMarked: string[] = ['name', 'description', 'query'];

  validationMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: `You must enter a monitor name`,
      pattern: `Monitor name cannot contain punctuation marks, except dashes and underscores`,
      maxlength: `Monitor name must be ${
        this.nameMaxCharLength
      } characters or less`,
    },
    description: {
      required: `You must enter a monitor description`,
    },
    query: {
      required: `You must enter a monitor EPL query`,
    },
    groups: {
      required: `You must grant access to at least one group`,
    },
  };

  placeholders = {
    name: `Please enter a monitor name`,
    description: `Please enter a monitor description`,
    query: `Please enter a valid EPL Query`,
    categories: this.placeholderCategories,
    groups: `Please select monitor access groups`,
  };

  constructor(
    private fb: FormBuilder,
    private monitorsService: MonitorsService,
    private filterService: FilterService,
    private cacheWindowService: CacheWindowService,
    public authService: AuthService,
    private router: Router,
  ) {
    this.loadingCategories = true;
    this.loadingGroups = true;
    this.getAvailableCategories();
    this.getAvailableActions();
    this.getAvailableGroups();

    // set the default access groups
    this.selectedGroups = this.authService.userGroups || [];

    this.createMonitorForm = this.fb.group({
      actions: [[]],
      cacheWindow: [this.cacheWindowService.durationValues[0]],
      categories: [this.selectedCategories],
      categoriesInput: [''],
      description: ['', Validators.required],
      groups: [this.selectedGroups, Validators.required],
      groupsInput: [''],
      id: null,
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 _-]+'),
          Validators.maxLength(this.nameMaxCharLength),
        ],
      ],
      priority: [this.defaultPriority],
      query: ['', Validators.required],
      status: [MonitorStatus.Offline, Validators.required],
      type: [MonitorType.Standard, Validators.required],
    });
  }

  ngOnInit() {
    if (this.monitor) {
      this.createMonitorForm.patchValue({
        cacheWindow: this.cacheWindowService.durationValues.indexOf(
          this.monitor.cacheWindow,
        ),
        description: this.monitor.description,
        id: this.monitor.id,
        name: this.monitorName || this.monitor.name,
        priority: this.monitor.priority || this.defaultPriority,
        query: this.monitor.query,
        status: this.monitor.status,
        type: this.monitor.type,
      });

      if (this.editForm) {
        this.createMonitorForm.get('name').disable();
      }
      this.selectedCategories = this.monitor.categories;
      this.createMonitorForm
        .get('categories')
        .setValue(this.selectedCategories);
      this.selectedGroups = this.monitor.groups;
      this.createMonitorForm.get('groups').setValue(this.selectedGroups);
    }

    this.controlsToBeMarked.forEach((name: string) => this.markControl(name));

    this.filteredCategories = this.createMonitorForm
      .get('categoriesInput')
      .valueChanges.pipe(
        startWith(null),
        map((term: string | ICategory) =>
          this.filterService.filterCategories(
            term,
            this.availableCategories,
            this.selectedCategories,
          ),
        ),
      );

    this.filteredGroups = this.createMonitorForm
      .get('groupsInput')
      .valueChanges.pipe(
        startWith(null),
        map((term: string | IGroup) =>
          this.filterService.filterGroups(
            term,
            this.availableGroups,
            this.selectedGroups,
          ),
        ),
      );
  }

  get canViewMonitor(): boolean {
    return (
      this.createMonitorForm.valid &&
      this.createMonitorForm.get('status').value === MonitorStatus.Online
    );
  }

  private markControl(name: string): void {
    const control = this.createMonitorForm.get(name);
    control.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      control.markAsDirty();
      control.markAsTouched();
    });
  }

  public submit(view: boolean = false) {
    const {
      cacheWindow: cacheWindowValue,
      categories,
      description,
      groups,
      id,
      name,
      query,
      status,
      type,
    } = this.createMonitorForm.getRawValue();

    const cacheWindow: number = this.cacheWindowService.durationValues[
      cacheWindowValue
    ];

    const monitor = {
      cacheWindow,
      categories,
      description,
      groups,
      name,
      query,
      status,
      type,
    } as IMonitor;

    if (id) {
      monitor.id = id;
    }

    this.submitForm.emit({ monitor, view } as IMonitorSubmit);
  }

  reset() {
    this.createMonitorForm.reset();
  }

  private getAvailableCategories(): void {
    this.monitorsService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.availableCategories = categories;
        this.loadingCategories = false;
      });
  }

  removeCategory(category: ICategory): void {
    this.selectedCategories = this.selectedCategories.filter(
      (selected: ICategory) => selected.id !== category.id,
    );
    const ctrl = this.createMonitorForm.get('categoriesInput');
    if (ctrl.disabled) {
      ctrl.enable();
      this.placeholders.categories = this.placeholderCategories;
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedCategories.length < this.maxSelectedCategories) {
      this.selectedCategories.push(event.option.value);
    }

    const ctrl = this.createMonitorForm.get('categoriesInput');
    if (this.selectedCategories.length >= this.maxSelectedCategories) {
      ctrl.disable();
      this.placeholders.categories = '';
    }
    ctrl.setValue(null);
  }

  getAvailableActions(): void {
    this.monitorsService.getActions().subscribe((actions: IAction[]) => {
      const groups: { [group: string]: IAction[] } = {};

      actions.forEach((action: IAction) => {
        if (groups[action.group] === undefined) {
          groups[action.group] = [action];
        } else {
          groups[action.group].push(action);
        }
      });

      Object.keys(groups).forEach((group: string) => {
        groups[group] = groups[group].sort((a: IAction, b: IAction) =>
          a.name.localeCompare(b.name),
        );
      });

      this.availableActions = groups;
    });
  }

  getAvailableGroups(): void {
    // this is a test group that will eventually be filtered out on the server
    const ignoreGroup: IGroup = {
      id: 547,
      name: LDAPGroup.AppForensicMonitoringS1,
    } as IGroup;

    this.monitorsService.getGroups().subscribe((groups: IGroup[]) => {
      this.availableGroups = groups.filter(
        (group: IGroup) => group.id !== ignoreGroup.id,
      );
      this.loadingGroups = false;
    });
  }

  removeGroup(group: IGroup): void {
    this.selectedGroups = this.selectedGroups.filter(
      (selected: IGroup) => selected.id !== group.id,
    );
    const groups = this.createMonitorForm.get('groups');
    groups.setValue(this.selectedGroups);
    // mark as touched in case the user removes the default groups,
    // otherwise the validation error message won't show.
    groups.markAsTouched();
  }

  selectedGroup(event: MatAutocompleteSelectedEvent): void {
    this.selectedGroups.push(event.option.value);
    this.createMonitorForm.get('groups').setValue(this.selectedGroups);
    this.createMonitorForm.get('groupsInput').setValue(null);
  }

  updateCacheWindow(duration: number) {
    this.createMonitorForm.get('cacheWindow').setValue(duration);
  }

  cancel() {
    this.router.navigateByUrl('/monitors');
  }
}
