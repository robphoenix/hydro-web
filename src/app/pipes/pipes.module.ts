import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterCategoriesPipe } from './filter-categories.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterPipe, FilterCategoriesPipe],
  exports: [FilterPipe, FilterCategoriesPipe],
})
export class PipesModule {}
