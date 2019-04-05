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
import { Observable } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material';
import { IActions } from 'src/app/actions/actions';

@Component({
  selector: 'app-create-monitor-form-actions',
  templateUrl: './create-monitor-form-actions.component.html',
  styleUrls: ['./create-monitor-form-actions.component.scss'],
})
export class CreateMonitorFormActionsComponent implements OnChanges {
  @Input()
  parent: FormGroup;

  @Input()
  loading: boolean;

  @Input()
  selectedActions: IActions[];

  @Input()
  autocompleteOptions: { [key: string]: any };

  @Input()
  filteredActions: Observable<IActions[]>;

  @Input()
  validationMessages: { [key: string]: string };

  @Input()
  placeholder: string;

  @Output()
  removeActions = new EventEmitter<IActions>();

  @Output()
  selectedAction = new EventEmitter<MatAutocompleteSelectedEvent>();

  availableActions: IActions[];

  @ViewChild('actionsInput')
  actionsInput: ElementRef;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  remove(actions: IActions) {
    this.removeActions.emit(actions);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedAction.emit(event);
    this.actionsInput.nativeElement.value = '';
  }

  ngOnChanges() {
    this.filteredActions.subscribe((filtered) => {
      this.availableActions = filtered;
    });
  }
}
