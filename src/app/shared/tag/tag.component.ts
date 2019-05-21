import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input()
  color: string;

  get primary(): boolean {
    return this.color === 'primary';
  }

  get accent(): boolean {
    return this.color === 'accent';
  }
}
