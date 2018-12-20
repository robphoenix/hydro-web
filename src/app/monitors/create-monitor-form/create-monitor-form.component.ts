import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
} from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { ICategory } from '../monitor';
import { MonitorsService } from '../monitors.service';
import { debounceTime, startWith, map } from 'rxjs/operators';

import { Editor, EditorFromTextArea } from 'codemirror';
import 'codemirror/mode/sql/sql';
declare var require: any;

@Component({
  selector: 'app-create-monitor-form',
  templateUrl: './create-monitor-form.component.html',
  styleUrls: ['./create-monitor-form.component.scss'],
})
export class CreateMonitorFormComponent implements OnInit, AfterViewInit {
  codemirrorConfig = {
    mode: 'text/x-sql',
    lineWrapping: false,
    lineNumbers: true,
    theme: 'base16-light',
  };
  codeMirror: EditorFromTextArea;
  @ViewChild('ref')
  ref: ElementRef;

  formGroup: FormGroup;

  categoriesAutocompleteOptions = {
    selectable: true,
    removable: true,
    addOnBlur: true,
    separatorKeysCodes: [ENTER, COMMA, SPACE],
  };
  availableCategories: string[] = [];
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

    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      status: ['offline', Validators.required],
      description: ['', Validators.required],
      categories: [this.selectedCategories],
    });
  }

  ngAfterViewInit() {
    const { fromTextArea } = require('codemirror');
    this.codeMirror = fromTextArea(
      this.ref.nativeElement,
      this.codemirrorConfig,
    );

    this.codeMirror.on('change', (editor: Editor) => {
      const value = editor.getDoc().getValue();
      console.log({ value });
    });
    this.codeMirror.setSize('600px', '600px');
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

    const categoriesControl = this.formGroup.get('categories');
    this.filteredCategories = categoriesControl.valueChanges.pipe(
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

  addCategory(event: MatChipInputEvent): void {
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

    this.formGroup.get('categories').setValue(null);
  }

  removeCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedCategories.length < this.maxSelectedCategories) {
      this.selectedCategories.push(event.option.viewValue);
    }
    this.formGroup.get('categories').setValue(null);
  }
}
