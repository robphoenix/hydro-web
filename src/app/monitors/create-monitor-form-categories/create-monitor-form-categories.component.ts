import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material';
import { Observable } from 'rxjs';
import { ICategory } from '../monitor';

@Component({
  selector: 'hydro-create-monitor-form-categories',
  templateUrl: './create-monitor-form-categories.component.html',
  styleUrls: ['./create-monitor-form-categories.component.scss'],
})
export class CreateMonitorFormCategoriesComponent implements OnChanges, OnInit {
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

  hint = '';
  availableCategories: ICategory[];

  @ViewChild('categoryInput')
  categoryInput: ElementRef;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    this.hint = `You can apply up to ${this.maxSelectedCategories} categories`;
  }

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
