import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-button-raised',
  templateUrl: './button-raised.component.html',
  styleUrls: ['./button-raised.component.scss'],
})
export class ButtonRaisedComponent {
  @Input()
  disabled: boolean;

  @Input()
  color: String;

  @Input()
  type: String;
}
