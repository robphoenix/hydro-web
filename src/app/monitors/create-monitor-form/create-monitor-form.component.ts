import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { ICategory, IAction, IGroup } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { debounceTime, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-monitor-form',
  templateUrl: './create-monitor-form.component.html',
  styleUrls: ['./create-monitor-form.component.scss'],
})
export class CreateMonitorFormComponent implements OnInit {
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

  availableActions: { [group: string]: IAction[] } = {};

  availableGroups: IGroup[] = [];
  selectedGroups: IGroup[] = [];
  filteredGroups: Observable<IGroup[]>;
  loadingGroups = false;

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

  constructor(
    private fb: FormBuilder,
    private monitorsService: MonitorsService,
  ) {
    this.loadingCategories = true;
    this.loadingGroups = true;
    this.getAvailableCategories();
    this.getAvailableActions();
    this.getAvailableGroups();

    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      status: ['offline', Validators.required],
      description: ['', Validators.required],
      categories: [this.selectedCategories],
      categoriesInput: [''],
      query: ['', Validators.required],
      actions: [[]],
      groups: [this.selectedGroups],
      groupsInput: [''],
    });
  }

  ngOnInit() {
    const nameControl = this.formGroup.get('name');
    nameControl.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      nameControl.markAsDirty();
      nameControl.markAsTouched();
    });

    const descriptionControl = this.formGroup.get('description');
    descriptionControl.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      descriptionControl.markAsDirty();
      descriptionControl.markAsTouched();
    });

    const queryControl = this.formGroup.get('query');
    queryControl.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      queryControl.markAsDirty();
      queryControl.markAsTouched();
    });

    const categoriesInputControl = this.formGroup.get('categoriesInput');
    this.filteredCategories = categoriesInputControl.valueChanges.pipe(
      startWith(null),
      map((term: string | ICategory) => {
        const available = this.availableCategories.filter(
          (category: ICategory) =>
            !this.selectedCategories
              .map((selected: ICategory) => selected.id)
              .includes(category.id),
        );
        if (!term || typeof term !== 'string') {
          return available;
        }
        return available.filter((category: ICategory) =>
          category.name.toLowerCase().includes(term.toLowerCase()),
        );
      }),
    );

    const groupsInputControl = this.formGroup.get('groupsInput');
    this.filteredGroups = groupsInputControl.valueChanges.pipe(
      startWith(null),
      map((term: string | IGroup) => {
        const available = this.availableGroups.filter(
          (group: IGroup) =>
            !this.selectedGroups
              .map((selected: IGroup) => selected.id)
              .includes(group.id),
        );
        if (!term || typeof term !== 'string') {
          return available;
        }
        return available.filter((group: IGroup) =>
          group.name.toLowerCase().includes(term.toLowerCase()),
        );
      }),
    );
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
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedCategories.length < this.maxSelectedCategories) {
      this.selectedCategories.push(event.option.value);
    }

    const ctrl = this.formGroup.get('categoriesInput');
    if (this.selectedCategories.length >= this.maxSelectedCategories) {
      ctrl.disable();
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

  selectedActions(actions: IAction[]): void {
    this.formGroup.patchValue({ actions });
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
  }

  selectedGroup(event: MatAutocompleteSelectedEvent): void {
    this.selectedGroups.push(event.option.value);
    this.formGroup.get('groupsInput').setValue(null);
  }
}
