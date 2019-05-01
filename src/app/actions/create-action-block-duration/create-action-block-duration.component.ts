import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionBlockTimeUnit } from '../action';

@Component({
  selector: 'hydro-create-action-block-duration',
  templateUrl: './create-action-block-duration.component.html',
  styleUrls: ['./create-action-block-duration.component.scss'],
})
export class CreateActionBlockDurationComponent implements OnInit {
  public validationMessage = `You must specify a block time or block permanently`;
  public units: string[];
  private actionBlockTimeUnit: typeof ActionBlockTimeUnit = ActionBlockTimeUnit;

  @Input()
  parent: FormGroup;

  ngOnInit(): void {
    this.units = Object.values(this.actionBlockTimeUnit);
  }

  public get isBlockPermanently(): boolean {
    return this.parent.get('permanently').value;
  }

  public get hasError(): boolean {
    return this.parent.get('blockTime').hasError('required');
  }
}
