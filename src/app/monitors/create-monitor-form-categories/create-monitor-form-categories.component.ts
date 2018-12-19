import {
  Component,
  OnInit,
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
  selectedCategories: string[];

  @Input()
  autocompleteOptions: { [key: string]: any };

  @Input()
  filteredCategories: Observable<string[]>;

  @Output()
  removeCategory = new EventEmitter<string>();

  @Output()
  addCategory = new EventEmitter<MatChipInputEvent>();

  @Output()
  selectedCategory = new EventEmitter<MatAutocompleteSelectedEvent>();

  availableCategories: string[];

  @ViewChild('categoryInput')
  categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  remove(category: string) {
    this.removeCategory.emit(category);
  }

  add(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      this.addCategory.emit(event);
    }
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
