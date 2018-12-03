import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
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
  categoriesFormGroup: FormGroup;
  selectedCategories: string[] = [];
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  addOnBlur = true;
  categoryCtrl = new FormControl();

  @Input()
  stepper: MatStepper;

  filteredCategories: Observable<string[]>;

  currentCategories: string[] = [
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

  @ViewChild('categoryInput')
  categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder) {
    this.categoriesFormGroup = this.fb.group({
      categories: [this.selectedCategories],
    });
  }

  add(event: MatChipInputEvent): void {
    console.log('add');

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
      this.currentCategories.push(category);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected');
    const value = event.option.viewValue;
    this.selectedCategories.push(value);
    this.currentCategories.splice(this.currentCategories.indexOf(value), 1);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  ngOnInit() {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map(
        (category: string | null) =>
          category
            ? this.currentCategories.filter((c) =>
                c.toLowerCase().includes(category.toLowerCase()),
              )
            : this.currentCategories.slice(),
      ),
    );
  }
}
