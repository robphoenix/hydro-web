import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
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
