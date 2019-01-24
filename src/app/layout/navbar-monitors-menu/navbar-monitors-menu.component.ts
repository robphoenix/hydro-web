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
      icon: 'standard',
    },
    {
      name: 'Archived Monitors',
      url: 'archived',
      icon: 'archived',
    },
    {
      name: 'System Monitors',
      url: 'system',
      icon: 'system',
    },
    {
      name: 'Add New Monitor',
      url: 'add',
      icon: 'add',
    },
  ];
}
