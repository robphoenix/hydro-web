import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accent-button',
  templateUrl: './accent-button.component.html',
  styleUrls: ['./accent-button.component.scss'],
})
export class AccentButtonComponent {
  @Input()
  disabled: boolean;

  @Input()
  icon: string;
}
