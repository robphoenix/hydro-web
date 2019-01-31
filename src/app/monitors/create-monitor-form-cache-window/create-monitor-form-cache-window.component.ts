import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-create-monitor-form-cache-window',
  templateUrl: './create-monitor-form-cache-window.component.html',
  styleUrls: ['./create-monitor-form-cache-window.component.scss'],
})
export class CreateMonitorFormCacheWindowComponent {
  max = 0;
  min = 0;
  value = 0;

  private durations: number[] = [
    0,
    30 * 1,
    1 * 60,
    2 * 60,
    5 * 60,
    10 * 60,
    15 * 60,
    30 * 60,
    1 * 60 * 60,
    2 * 60 * 60,
    4 * 60 * 60,
    6 * 60 * 60,
    12 * 60 * 60,
    18 * 60 * 60,
    1 * 24 * 60 * 60,
    2 * 24 * 60 * 60,
    4 * 24 * 60 * 60,
    1 * 7 * 24 * 60 * 60,
  ];
  public duration: number;

  private durationNames: string[] = [
    'off',
    '30 seconds',
    '1 minute',
    '2 minutes',
    '5 minutes',
    '10 minutes',
    '15 minutes',
    '30 minutes',
    '1 hours',
    '2 hours',
    '4 hours',
    '6 hours',
    '12 hours',
    '18 hours',
    '1 day',
    '2 days',
    '4 days',
    '1 week',
  ];
  durationName: string;

  // tslint:disable-next-line:max-line-length
  readonly tooltip = `This feature allows you to accumulate live events over the given period, with each new event being added to the cache. This means that when an esper event occurs the previous event data isn't simply deleted, but can still be viewed; however, it will be dropped from the cache once it reaches the cache limit value, as shown on the left.

Be careful how you use this feature as it could break your browser or cause the server to crash...`;

  @Output()
  durationChange = new EventEmitter<number>();

  onInputChange(event: MatSliderChange) {
    this.durationName = this.durationNames[event.value];
    this.duration = this.durations[event.value];
  }

  onValueChange() {
    this.durationChange.emit(this.duration);
  }

  constructor() {
    this.max = this.durationNames.length - 1;
    this.durationName = this.durationNames[this.value];
  }
}
