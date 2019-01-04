import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IGroup } from '../monitor';
import { MatSelectionList, MatListOption } from '@angular/material';

@Component({
  selector: 'app-create-monitor-form-groups',
  templateUrl: './create-monitor-form-groups.component.html',
  styleUrls: ['./create-monitor-form-groups.component.scss'],
})
export class CreateMonitorFormGroupsComponent {
  @Input()
  parent: FormGroup;

  @Input()
  availableGroups: IGroup[];
}
