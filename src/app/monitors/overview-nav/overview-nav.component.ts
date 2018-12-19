import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-nav',
  templateUrl: './overview-nav.component.html',
  styleUrls: ['./overview-nav.component.scss'],
})
export class OverviewNavComponent {
  @Input()
  currentPage: string;

  @Input()
  pageLinks: string[];

  icons: { [key: string]: string } = {
    standard: 'flash_on',
    archived: 'archive',
    system: 'tune',
  };
}
