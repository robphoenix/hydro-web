import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../monitor';
import { Observable } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material';

@Component({
  selector: 'hydro-create-monitor-categories-select',
  templateUrl: './create-monitor-categories-select.component.html',
  styleUrls: ['./create-monitor-categories-select.component.scss'],
})
export class CreateMonitorCategoriesSelectComponent implements OnChanges {
  @Input()
  parent: FormGroup;

  @Input()
  loading: boolean;

  @Input()
  selectedCategories: ICategory[];

  @Input()
  autocompleteOptions: { [key: string]: any };

  @Input()
  filteredCategories: Observable<ICategory[]>;

  @Input()
  maxSelectedCategories: number;

  @Input()
  validationMessages: { [key: string]: string };

  @Input()
  placeholder: string;

  @Output()
  removeCategory = new EventEmitter<ICategory>();

  @Output()
  selectedCategory = new EventEmitter<MatAutocompleteSelectedEvent>();

  availableCategories: ICategory[];

  @ViewChild('categoryInput')
  categoryInput: ElementRef;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  remove(category: ICategory) {
    this.removeCategory.emit(category);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedCategory.emit(event);
    this.categoryInput.nativeElement.value = '';
  }

  ngOnChanges() {
    if (this.filteredCategories) {
      this.filteredCategories.subscribe((filtered) => {
        this.availableCategories = filtered.sort(
          (a: ICategory, b: ICategory) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          },
        );
      });
    }
  }

  public get label(): string {
    if (this.availableCategories && this.availableCategories.length) {
      return `Categories`;
    }
    return `Categories: none currently exist :(`;
  }

  public get hint(): string {
    if (this.availableCategories && this.availableCategories.length) {
      return `You can apply up to ${this.maxSelectedCategories} categories`;
    }
    return ``;
  }
}
