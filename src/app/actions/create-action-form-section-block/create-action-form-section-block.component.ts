import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-action-form-section-block',
  templateUrl: './create-action-form-section-block.component.html',
  styleUrls: ['./create-action-form-section-block.component.scss'],
})
export class CreateActionFormSectionBlockComponent {
  blockItems: string[] = [
    'IP Address',
    'IP Range',
    'User Agent',
    'XForwardedFor',
    'UQID',
    'STK',
  ];
  selected = '';
  durationLength: number;
  durationType: string;
  delayLength: number;
  delayType: string;
  permanently = false;

  name: string;

  @Output()
  nameChange = new EventEmitter<string>();

  constructor() {
    this.updateName();
  }

  updateName() {
    let duration = '';
    if (!this.permanently && this.durationLength && this.durationType) {
      duration = `for ${this.durationLength} ${this.durationType}`;
    }

    let delay = '';

    if (!this.permanently && this.delayLength && this.delayType) {
      delay = `with up to ${this.delayLength} ${this.delayType} random delay`;
    }

    this.name = `Block ${this.selected} ${duration} ${delay} ${
      this.permanently ? 'permanently' : ''
    }`;
    this.nameChange.emit(this.name);
  }

  blockPermanently() {
    this.permanently = true;
  }
}
