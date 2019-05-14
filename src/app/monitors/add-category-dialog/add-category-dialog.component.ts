import { Component, OnInit, Inject } from '@angular/core';
import { MonitorsService } from '../monitors.service';
import { ICategory } from '../monitor';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { ValidateUniqueCategory } from 'src/validators/unique-category.validator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'hydro-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
})
export class AddCategoryDialogComponent implements OnInit {
  public newCategoryForm: FormGroup;
  public duplicateCategories: string;
  public name: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.name = new FormControl(``, [
      Validators.required,
      ValidateUniqueCategory(this.data.categories),
    ]);
  }

  ngOnInit() {}

  public hasError(error: string): boolean {
    const errors = this.name.errors;
    if (errors) {
      const { duplicateCategories } = errors;
      this.duplicateCategories = duplicateCategories
        ? duplicateCategories.join(`, `)
        : ``;
    }

    return this.name.hasError(error);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.name.value);
  }
}
