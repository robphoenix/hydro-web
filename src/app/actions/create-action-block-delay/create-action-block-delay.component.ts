import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActionBlockDelayUnit } from '../action';

@Component({
  selector: 'hydro-create-action-block-delay',
  templateUrl: './create-action-block-delay.component.html',
  styleUrls: ['./create-action-block-delay.component.scss'],
})
export class CreateActionBlockDelayComponent implements OnInit {
  public units: string[];
  private actionBlockDelayUnit: typeof ActionBlockDelayUnit = ActionBlockDelayUnit;

  @Input()
  parent: FormGroup;

  ngOnInit() {
    this.units = Object.values(this.actionBlockDelayUnit);
  }

  public get isBlockPermanently(): boolean {
    return this.parent.get(`permanently`).value;
  }
}
