import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-navbar-button',
  templateUrl: './primary-navbar-button.component.html',
  styleUrls: ['./primary-navbar-button.component.scss'],
})
export class PrimaryNavbarButtonComponent {
  @Input()
  menu: boolean;
}
