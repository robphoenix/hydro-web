import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overview-toolbar',
  templateUrl: './overview-toolbar.component.html',
  styleUrls: ['./overview-toolbar.component.scss'],
})
export class OverviewToolbarComponent {
  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  searchMonitors(searchTerm: string) {
    this.search.emit(searchTerm);
  }
}
