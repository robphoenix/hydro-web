import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-actions-menu',
  templateUrl: './navbar-actions-menu.component.html',
  styleUrls: ['./navbar-actions-menu.component.scss'],
})
export class NavbarActionsMenuComponent {
  menuItems: { [key: string]: string }[] = [
    {
      name: 'All Actions',
      url: '',
      icon: 'actions',
    },
    {
      name: 'Add New Action',
      url: 'add',
      icon: 'add',
    },
  ];
}
