import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accent-link-button',
  templateUrl: './accent-link-button.component.html',
  styleUrls: ['./accent-link-button.component.scss'],
})
export class AccentLinkButtonComponent {
  @Input()
  routerLink: string;

  @Input()
  icon: string;

  @Input()
  text: string;
}
