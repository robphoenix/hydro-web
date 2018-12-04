import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  MatStepper,
  MatChipInputEvent,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-monitor-categories-formgroup',
  templateUrl: './monitor-categories-formgroup.component.html',
  styleUrls: ['./monitor-categories-formgroup.component.scss'],
})
export class MonitorCategoriesFormgroupComponent implements OnInit {
  @Input()
  stepper: MatStepper;

  @ViewChild('categoryInput')
  categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  categoriesFormGroup: FormGroup;
  categoryCtrl = new FormControl();
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

  constructor(private fb: FormBuilder) {
    this.categoriesFormGroup = this.fb.group({
      categories: [this.selectedCategories],
    });
  }

  ngOnInit() {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
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

    this.categoryCtrl.setValue(null);
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
    this.categoryCtrl.setValue(null);
  }
}
