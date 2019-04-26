import { Component, Input } from '@angular/core';

@Component({
  selector: 'hydro-dialog-close-button',
  templateUrl: './dialog-close-button.component.html',
  styleUrls: ['./dialog-close-button.component.scss'],
})
export class DialogCloseButtonComponent {
  @Input()
  disabled: boolean;

  @Input()
  icon: string;

  @Input()
  dialogClose: any;
}
