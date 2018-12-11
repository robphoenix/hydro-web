import { Component, Input } from '@angular/core';
import { ICategory } from '../monitor';

@Component({
  selector: 'app-cell-categories',
  templateUrl: './cell-categories.component.html',
  styleUrls: ['./cell-categories.component.scss'],
})
export class CellCategoriesComponent {
  @Input()
  categories: ICategory[];
}
