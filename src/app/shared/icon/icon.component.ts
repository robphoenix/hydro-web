import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input()
  type: string;

  icons: { [type: string]: string } = {
    add: 'add',
    actions: 'report_problem',
    categories: 'category',
    monitor: 'flash_on',
    standard: 'flash_on',
    archived: 'archive',
    system: 'tune',
  };
}
