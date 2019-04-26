import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'hydro-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss'],
})
export class MultipleSelectComponent {
  @Input()
  formControl: FormControl;

  @Input()
  options: string[];

  @Input()
  selectedOptions: string[];

  @Input()
  placeHolder: string;

  @Output()
  selectedOptionsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  updateSelectedOptions() {
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  selectAll() {
    this.selectedOptions = this.options;
    this.updateSelectedOptions();
  }

  clearSelectedOptions() {
    this.selectedOptions = [];
    this.updateSelectedOptions();
  }
}
