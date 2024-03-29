import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hydro-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input()
  searchTerm: string;

  @Input()
  placeHolder: string;

  @Output()
  searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  updateSearchTerm() {
    this.searchTermChange.emit(this.searchTerm);
  }

  clearSearchTerm() {
    this.searchTerm = '';
    this.updateSearchTerm();
  }
}
