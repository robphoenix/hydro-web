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
} from '../monitor';
import { MonitorsService } from '../monitors.service';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-create-monitor-form',
  templateUrl: './create-monitor-form.component.html',
  styleUrls: ['./create-monitor-form.component.scss'],
})
export class CreateMonitorFormComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  buttonText: string;

  @Input()
  monitor: IMonitor;

  @Input()
  monitorName: string;

  @Input()
  editForm: boolean;

  @Output()
  submitForm = new EventEmitter<IMonitor>();

  formGroup: FormGroup;

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

  private controlsToBeMarked: string[] = ['name', 'description', 'query'];

  validationMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: `You must enter a monitor name`,
      pattern: `Monitor name cannot contain punctuation characters`,
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
    public authService: AuthService,
  ) {
    this.loadingCategories = true;
    this.loadingGroups = true;
    this.getAvailableCategories();
    this.getAvailableActions();
    this.getAvailableGroups();

    // set the default access groups
    this.selectedGroups = this.authService.userGroups || [];

    this.formGroup = this.fb.group({
      id: null,
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 _]+')]],
      status: ['offline', Validators.required],
      priority: [MonitorPriority.Lowest],
      description: ['', Validators.required],
      query: ['', Validators.required],
      categories: [this.selectedCategories],
      categoriesInput: [''],
      actions: [[]],
      groups: [this.selectedGroups, Validators.required],
      groupsInput: [''],
    });
  }

  ngOnInit() {
    if (this.monitor) {
      this.formGroup.patchValue({
        id: this.monitor.id,
        name: this.monitorName || this.monitor.name,
        description: this.monitor.description,
        status: this.monitor.status,
        priority: this.monitor.priority || MonitorPriority.Lowest,
        query: this.monitor.query,
      });

      if (this.editForm) {
        this.formGroup.get('name').disable();
      }
      this.selectedCategories = this.monitor.categories;
      this.formGroup.get('categories').setValue(this.selectedCategories);
      this.selectedGroups = this.monitor.groups;
      this.formGroup.get('groups').setValue(this.selectedGroups);
    }

    this.controlsToBeMarked.forEach((name: string) => this.markControl(name));

    this.filteredCategories = this.formGroup
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

    this.filteredGroups = this.formGroup.get('groupsInput').valueChanges.pipe(
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

  private markControl(name: string): void {
    const control = this.formGroup.get(name);
    control.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      control.markAsDirty();
      control.markAsTouched();
    });
  }

  public submit() {
    const {
      id,
      name,
      status,
      // uncomment when API has been updated
      // priority,
      type,
      description,
      query,
      categories,
      groups,
    } = this.formGroup.value;

    const monitor = {
      name,
      status,
      // uncomment when API has been updated
      // priority,
      type,
      description,
      query,
      categories,
      groups,
    } as IMonitor;

    if (id) {
      monitor.id = id;
    }

    this.submitForm.emit(monitor);
  }

  reset() {
    this.formGroup.reset();
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
    const ctrl = this.formGroup.get('categoriesInput');
    if (ctrl.disabled) {
      ctrl.enable();
      this.placeholders.categories = this.placeholderCategories;
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedCategories.length < this.maxSelectedCategories) {
      this.selectedCategories.push(event.option.value);
    }

    const ctrl = this.formGroup.get('categoriesInput');
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
    const groups = this.formGroup.get('groups');
    groups.setValue(this.selectedGroups);
    // mark as touched in case the user removes the default groups,
    // otherwise the validation error message won't show.
    groups.markAsTouched();
  }

  selectedGroup(event: MatAutocompleteSelectedEvent): void {
    this.selectedGroups.push(event.option.value);
    this.formGroup.get('groups').setValue(this.selectedGroups);
    this.formGroup.get('groupsInput').setValue(null);
  }
}
