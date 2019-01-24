import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-actions-menu',
  templateUrl: './navbar-actions-menu.component.html',
  styleUrls: ['./navbar-actions-menu.component.scss'],
})
export class NavbarActionsMenuComponent {
  buttonText = 'actions';
  menu = true;
  menuItems: { [key: string]: string }[] = [
    {
      name: 'All Actions',
      url: '',
      icon: 'done_all',
    },
    {
      name: 'Add New Action',
      url: 'add',
      icon: 'add',
    },
  ];
}
