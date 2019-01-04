import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IGroup } from '../monitor';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-monitor-form-groups',
  templateUrl: './create-monitor-form-groups.component.html',
  styleUrls: ['./create-monitor-form-groups.component.scss'],
})
export class CreateMonitorFormGroupsComponent implements OnChanges {
  @Input()
  parent: FormGroup;

  @Input()
  loading: boolean;

  @Input()
  selectedGroups: IGroup[];

  @Input()
  autocompleteOptions: { [key: string]: any };

  @Input()
  filteredGroups: Observable<IGroup[]>;

  @Output()
  removeGroup = new EventEmitter<IGroup>();

  @Output()
  selectedGroup = new EventEmitter<MatAutocompleteSelectedEvent>();

  availableGroups: IGroup[];

  @ViewChild('inputElement')
  inputElement: ElementRef;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  remove(group: IGroup) {
    this.removeGroup.emit(group);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedGroup.emit(event);
    this.inputElement.nativeElement.value = '';
  }

  ngOnChanges() {
    this.filteredGroups.subscribe((filtered: IGroup[]) => {
      this.availableGroups = filtered;
    });
  }
}
