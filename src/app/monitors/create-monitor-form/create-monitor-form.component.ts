import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatDialog,
  MatSnackBar,
} from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {
  ICategory,
  IGroup,
  IMonitor,
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
import { ActionsService } from 'src/app/actions/actions.service';
import { IAction } from 'src/app/actions/action';
import { IErrorMessage } from 'src/app/shared/error-message';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'hydro-create-monitor-form',
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
  isEditForm = false;

  @Output()
  submitForm = new EventEmitter<IMonitorSubmit>();

  createMonitorForm: FormGroup;

  readonly defaultPriority = MonitorPriority.Mid;

  public autocompleteOptions = {
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

  availableActions: IAction[] = [];
  selectedActions: IAction[] = [];
  filteredActions: Observable<IAction[]>;
  loadingActions = false;

  availableGroups: IGroup[] = [];
  selectedGroups: IGroup[] = [];
  filteredGroups: Observable<IGroup[]>;
  loadingGroups = false;

  public nameMaxCharLength = 50;
  private controlsToBeMarked: string[] = ['name', 'description', 'query'];

  validationMessages: { [key: string]: { [key: string]: string } } = {
    description: {
      required: `You must enter a monitor description`,
    },
    query: {
      required: `You must enter a monitor EPL query`,
    },
    groups: {
      required: `You must grant access to at least one group`,
    },
    actions: {
      required: `I'm not sure to be honest`,
    },
  };

  placeholders = {
    description: `Please enter a monitor description`,
    query: `Please enter a valid EPL Query`,
    categories: this.placeholderCategories,
    groups: `Please select monitor access groups`,
    actions: `Please select monitor actions`,
  };

  constructor(
    private formBuilder: FormBuilder,
    private monitorsService: MonitorsService,
    private filterService: FilterService,
    private cacheWindowService: CacheWindowService,
    private authService: AuthService,
    private router: Router,
    private actionsService: ActionsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.loadingCategories = true;
    this.loadingGroups = true;
    this.loadingActions = true;
    this.getAvailableActions();
    this.getAvailableGroups();

    // set the default access groups
    this.selectedGroups = this.authService.userGroups || [];

    this.createMonitorForm = this.formBuilder.group({
      actions: [this.selectedActions],
      actionsInput: [''],
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
        type: this.isAdmin ? this.monitor.type : MonitorType.Standard,
      });

      this.selectedCategories = this.monitor.categories;
      this.createMonitorForm
        .get('categories')
        .setValue(this.selectedCategories);
      this.selectedGroups = this.monitor.groups;
      this.createMonitorForm.get('groups').setValue(this.selectedGroups);
      this.selectedActions = this.monitor.actions;
      this.createMonitorForm.get('actions').setValue(this.selectedActions);
    }

    this.controlsToBeMarked.forEach((name: string) => this.markControl(name));

    this.getAvailableCategories();

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

    this.filteredActions = this.createMonitorForm
      .get('actionsInput')
      .valueChanges.pipe(
        startWith(null),
        map((term: string | IAction) =>
          this.filterService.filterActions(
            term,
            this.availableActions,
            this.selectedActions,
          ),
        ),
      );
  }

  public get allowsEnable(): boolean {
    return this.authService.allowsEnable;
  }

  public get isAdmin(): boolean {
    return this.authService.isAdmin;
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
      actions,
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
      actions,
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

    console.log(`in create`);

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
        if (!this.availableCategories || !this.availableCategories.length) {
          this.createMonitorForm.get(`categoriesInput`).disable();
        } else {
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
        }
      });
  }

  removeCategory(category: ICategory): void {
    this.selectedCategories = this.selectedCategories.filter(
      (selected: ICategory) => selected.id !== category.id,
    );
    this.createMonitorForm.get('categories').setValue(this.selectedCategories);

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
    this.actionsService.getActions().subscribe((actions: IAction[]) => {
      this.availableActions = actions;
      this.loadingActions = false;
    });
  }

  removeAction(action: IAction): void {
    this.selectedActions = this.selectedActions.filter(
      (selected: IAction) => selected.id !== action.id,
    );
    const actions = this.createMonitorForm.get('actions');
    actions.setValue(this.selectedActions);
    // mark as touched in case the user removes the default groups,
    // otherwise the validation error message won't show.
    actions.markAsTouched();
  }

  selectedAction(event: MatAutocompleteSelectedEvent): void {
    this.selectedActions.push(event.option.value);
    this.createMonitorForm.get('actions').setValue(this.selectedActions);
    this.createMonitorForm.get('actionsInput').setValue(null);
  }

  getAvailableGroups(): void {
    this.monitorsService.getGroups().subscribe((groups: IGroup[]) => {
      this.availableGroups = groups;
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
    this.router.navigateByUrl('/monitors/view');
  }

  public onSubmitCategories(categories: string[]) {
    this.monitorsService.addCategories({ categories }).subscribe(
      (response: ICategory[]) => {
        this.snackBar.open(
          `Categories created: ${response
            .map((category: ICategory) => category.name)
            .join(', ')}`,
          '',
          {
            duration: 2000,
          },
        );
        // refresh categories
        this.getAvailableCategories();
      },
      (err: IErrorMessage) => {
        const title = `error adding categories`;
        const { message, cause, uuid } = err;
        this.dialog.open(ErrorDialogComponent, {
          data: { title, message, cause, uuid },
          maxWidth: `800px`,
        });
      },
    );
  }
}
