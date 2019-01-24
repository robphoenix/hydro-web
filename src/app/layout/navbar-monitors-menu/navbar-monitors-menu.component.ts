import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-monitors-menu',
  templateUrl: './navbar-monitors-menu.component.html',
  styleUrls: ['./navbar-monitors-menu.component.scss'],
})
export class NavbarMonitorsMenuComponent {
  buttonText = 'monitors';
  menu = true;
  menuItems: { [key: string]: string }[] = [
    {
      name: 'Standard Monitors',
      url: 'standard',
      icon: 'flash_on',
    },
    {
      name: 'Archived Monitors',
      url: 'archived',
      icon: 'archive',
    },
    {
      name: 'System Monitors',
      url: 'system',
      icon: 'tune',
    },
    {
      name: 'Add New Monitor',
      url: 'add',
      icon: 'add',
    },
  ];
}
