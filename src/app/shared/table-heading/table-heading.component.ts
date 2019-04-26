import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-table-heading',
  templateUrl: './table-heading.component.html',
  styleUrls: ['./table-heading.component.scss'],
})
export class TableHeadingComponent {
  @Input()
  iconType: string;

  @Input()
  heading: string;
}
