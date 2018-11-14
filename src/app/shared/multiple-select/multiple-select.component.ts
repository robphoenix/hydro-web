import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss'],
})
export class MultipleSelectComponent {
  @Input()
  formControl: FormControl;

  @Input()
  options: string[];

  selectedOptions: string[];

  @Input()
  placeHolder: string;

  @Output()
  selectedOptionsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  updateSelectedOptions() {
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  clearSelectedOptions() {
    this.selectedOptions = [];
    this.updateSelectedOptions();
  }
}
