import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
  @Input()
  is: String;

  public isLevel(level: string) {
    return this.is === level;
  }
}
