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
  selectedCategories: string[] = [];
  filteredCategories: Observable<string[]>;
  availableCategories: string[] = [
    'script-attack',
    'Mobile',
    'Sports Book',
    'JohnSnow',
    'BetSlip',
    'GavinEdwards',
    'Scrapers',
    'China Arbs',
    'bettingslip',
    'Extra',
    'FRM',
    'Alerts',
    'NewLoginDefault',
    'Members',
    'Monitor',
    'Blocking',
    'Investigation',
    'HoneyPot',
    'Publisher',
    'Datacenter',
    'LoginAttack',
    'Bookmaker',
    'hostingfacility',
    'geo',
    'Martin',
    'OpenAccount',
    'Ragbag',
  ];

  validationMessages = {
    name: {
      required: `You must enter a monitor name`,
      pattern: `Monitor name cannot contain punctuation characters`,
    },
    description: {
      required: `You must enter a monitor description`,
    },
  };

  constructor(private fb: FormBuilder) {
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
        if (!term) {
          return this.availableCategories.slice();
        }
        return this.availableCategories.filter((c) =>
          c.toLowerCase().includes(term.toLowerCase()),
        );
      }),
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value && !this.selectedCategories.includes(value)) {
      this.selectedCategories.push(value);
    }

    if (input) {
      input.value = '';
    }

    this.categoriesControl.setValue(null);
  }

  remove(category: string): void {
    const index = this.selectedCategories.indexOf(category);

    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
      this.availableCategories.push(category);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const index = this.availableCategories.indexOf(value);
    this.selectedCategories.push(value);
    this.availableCategories.splice(index, 1);
    this.categoryInput.nativeElement.value = '';
    this.categoriesControl.setValue(null);
  }
}
