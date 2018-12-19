import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monitors-overview-nav',
  templateUrl: './monitors-overview-nav.component.html',
  styleUrls: ['./monitors-overview-nav.component.scss'],
})
export class MonitorsOverviewNavComponent implements OnInit {
  @Input()
  currentPage: string;

  @Input()
  pageLinks: string[];

  icons: { [key: string]: string } = {
    standard: 'flash_on',
    archived: 'archive',
    system: 'tune',
  };

  constructor() {}

  ngOnInit() {}
}
