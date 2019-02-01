import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warn-button',
  templateUrl: './warn-button.component.html',
  styleUrls: ['./warn-button.component.scss'],
})
export class WarnButtonComponent {
  @Input()
  disabled: boolean;

  @Input()
  icon: string;
}
