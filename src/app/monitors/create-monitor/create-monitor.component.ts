import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { debounceTime, startWith, map } from 'rxjs/operators';
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
} from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MonitorsService } from '../monitors.service';
import { ICategory } from '../monitor';

@Component({
  selector: 'app-create-monitor',
  templateUrl: './create-monitor.component.html',
  styleUrls: ['./create-monitor.component.scss'],
})
export class CreateMonitorComponent implements OnInit {
  nameMessage: string;
  descriptionMessage: string;
  formGroup: FormGroup;
  nameControl: FormControl;
  descriptionControl: FormControl;
  categoriesControl: FormControl;

  @ViewChild('categoryInput')
  categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  categoriesOptions = {
    selectable: true,
    removable: true,
    addOnBlur: true,
    separatorKeysCodes: [ENTER, COMMA, SPACE],
  };
  availableCategories: string[] = [''];
  selectedCategories: string[] = [];
  filteredCategories: Observable<string[]>;
  loadingCategories = false;
  maxSelectedCategories = 4;

  validationMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: `You must enter a monitor name`,
      pattern: `Monitor name cannot contain punctuation characters`,
    },
    description: {
      required: `You must enter a monitor description`,
    },
  };

  constructor(
    private fb: FormBuilder,
    private monitorsService: MonitorsService,
  ) {
    this.loadingCategories = true;
    this.getAvailableCategories();

    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+'),
    ]);
    this.descriptionControl = new FormControl('', [Validators.required]);
    this.categoriesControl = new FormControl(this.selectedCategories);
    this.formGroup = this.fb.group({
      name: this.nameControl,
      status: ['offline', Validators.required],
      description: this.descriptionControl,
      categories: this.categoriesControl,
    });
  }

  ngOnInit() {
    this.nameControl.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.nameControl.markAsDirty();
      this.nameControl.markAsTouched();
    });

    this.descriptionControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.descriptionControl.markAsDirty();
        this.descriptionControl.markAsTouched();
      });

    this.filteredCategories = this.categoriesControl.valueChanges.pipe(
      startWith(null),
      map((term: string) => {
        const availableCategories = this.availableCategories.filter(
          (category: string) => !this.selectedCategories.includes(category),
        );
        if (!term) {
          return availableCategories;
        }
        return availableCategories.filter((category: string) =>
          category.toLowerCase().includes(term.toLowerCase()),
        );
      }),
    );
  }

  private getAvailableCategories(): void {
    this.monitorsService
      .getAllCurrentCategories()
      .subscribe((categories: ICategory[]) => {
        this.availableCategories = categories.map((c) => c.name);
        this.loadingCategories = false;
      });
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = (event.value || '').trim();

      if (
        value &&
        !this.selectedCategories.includes(value) &&
        this.selectedCategories.length < this.maxSelectedCategories
      ) {
        this.selectedCategories.push(value);
      }

      if (input) {
        input.value = '';
      }

      this.categoriesControl.setValue(null);
    }
  }

  remove(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const index = this.availableCategories.indexOf(value);
    if (this.selectedCategories.length < this.maxSelectedCategories) {
      this.selectedCategories.push(value);
    }
    this.categoryInput.nativeElement.value = '';
    this.categoriesControl.setValue(null);
  }
}
