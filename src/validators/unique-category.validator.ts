import { AbstractControl } from '@angular/forms';
import { ICategory } from 'src/app/monitors/monitor';

export function ValidateUniqueCategory(
  categories: ICategory[],
): (control: AbstractControl) => { uniquecategory: boolean } {
  return (control: AbstractControl) => {
    const value = control.value || ``;
    if (!value) {
      return null;
    }
    if (!categories || !categories.length) {
      return null;
    }

    const newCategories: string[] = value
      .split(`,`)
      .map((v: string) => v.trim());

    const duplicateCategories = newCategories.filter((newCategory: string) =>
      categories
        .map((category: ICategory) => category.name)
        .includes(newCategory),
    );

    if (duplicateCategories.length) {
      return { uniquecategory: true, duplicateCategories };
    }
    return null;
  };
}
