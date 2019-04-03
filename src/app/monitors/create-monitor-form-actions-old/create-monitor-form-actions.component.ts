import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
} from '@angular/core';
import { IAction } from '../monitor';
import { MatSelectionList, MatListOption } from '@angular/material';
import { MonitorsService } from '../monitors.service';

@Component({
  selector: 'app-create-monitor-form-actions',
  templateUrl: './create-monitor-form-actions.component.html',
  styleUrls: ['./create-monitor-form-actions.component.scss'],
})
export class CreateMonitorFormActionsComponent {
  @Input()
  availableActions: { [group: string]: IAction[] };

  @ViewChildren(MatSelectionList)
  selectionLists: QueryList<MatSelectionList>;

  @Output()
  selectedActions = new EventEmitter<IAction[]>();

  constructor(public monitorsService: MonitorsService) {}

  selectionChange() {
    const selected: IAction[] = this.selectionLists.reduce(
      (prev: IAction[], curr: MatSelectionList) => {
        return [
          ...prev,
          ...curr.selectedOptions.selected.map(
            (option: MatListOption) => option.value,
          ),
        ];
      },
      [],
    );
    this.selectedActions.emit(selected);
  }
}
