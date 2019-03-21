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
    actions: 'play_circle_filled',
    categories: 'category',
    monitor: 'flash_on',
    standard: 'flash_on',
    archived: 'archive',
    system: 'tune',
    menu: 'more_vert',
  };
}
