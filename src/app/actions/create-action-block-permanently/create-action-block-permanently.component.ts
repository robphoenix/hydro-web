import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-block-permanently',
  templateUrl: './create-action-block-permanently.component.html',
  styleUrls: ['./create-action-block-permanently.component.scss'],
})
export class CreateActionBlockPermanentlyComponent {
  @Input()
  parent: FormGroup;
}
