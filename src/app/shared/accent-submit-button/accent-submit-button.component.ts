import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accent-submit-button',
  templateUrl: './accent-submit-button.component.html',
  styleUrls: ['./accent-submit-button.component.scss'],
})
export class AccentSubmitButtonComponent {
  @Input()
  disabled: boolean;

  @Input()
  icon: string;
}
