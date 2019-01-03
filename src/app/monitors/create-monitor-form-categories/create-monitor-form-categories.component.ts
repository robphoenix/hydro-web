import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material';
import { Observable } from 'rxjs';
import { ICategory } from '../monitor';

@Component({
  selector: 'app-create-monitor-form-categories',
  templateUrl: './create-monitor-form-categories.component.html',
  styleUrls: ['./create-monitor-form-categories.component.scss'],
})
export class CreateMonitorFormCategoriesComponent implements OnChanges {
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
    this.filteredCategories.subscribe((filtered) => {
      this.availableCategories = filtered;
    });
  }
}
