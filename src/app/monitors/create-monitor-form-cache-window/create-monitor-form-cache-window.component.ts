import { Component, Input } from '@angular/core';
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

  private durations: string[] = [
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
  duration: string;

  // tslint:disable-next-line:max-line-length
  readonly tooltip = `This feature allows you to accumulate live events over the given period, with each new event being added to the cache. This means that when an esper event occurs the previous event data isn't simply deleted, but can still be viewed; however, it will be dropped from the cache once it reaches the cache limit value, as shown on the left.

Be careful how you use this feature as it could break your browser or cause the server to crash...`;

  @Input()
  parent: FormGroup;

  onInputChange(event: MatSliderChange) {
    this.duration = this.durations[event.value];
  }

  constructor() {
    this.max = this.durations.length - 1;
    this.duration = this.durations[this.value];
  }
}
