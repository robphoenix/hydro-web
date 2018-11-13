import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters-search',
  templateUrl: './filters-search.component.html',
  styleUrls: ['./filters-search.component.scss'],
})
export class FiltersSearchComponent implements OnInit {
  searchTerm: string;

  @Output()
  searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  updateSearchTerm() {
    this.searchTermChange.emit(this.searchTerm);
  }

  clearSearchTerm() {
    this.searchTerm = '';
    this.updateSearchTerm();
  }

  constructor() {}

  ngOnInit() {}
}
