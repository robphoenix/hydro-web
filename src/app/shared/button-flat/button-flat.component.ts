import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-button-flat',
  templateUrl: './button-flat.component.html',
  styleUrls: ['./button-flat.component.scss'],
})
export class ButtonFlatComponent {
  @Input()
  disabled: boolean;

  @Input()
  color: String;

  @Input()
  type: String;

  @Input()
  routerLink: String;
}
