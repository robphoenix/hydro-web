import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-monitors-menu',
  templateUrl: './navbar-monitors-menu.component.html',
  styleUrls: ['./navbar-monitors-menu.component.scss'],
})
export class NavbarMonitorsMenuComponent {
  menuItems: { name: string; url: string; icon: string }[] = [
    {
      name: 'Monitors Overview',
      url: '',
      icon: 'monitors',
    },
    {
      name: 'Add New Monitor',
      url: 'add',
      icon: 'add',
    },
  ];
}
