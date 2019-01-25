import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.scss'],
})
export class NavbarUserMenuComponent {
  @Input()
  name: string;

  @Output()
  logout = new EventEmitter();
}
