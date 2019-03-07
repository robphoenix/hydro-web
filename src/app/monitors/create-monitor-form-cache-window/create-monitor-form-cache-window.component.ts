import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-monitor-form-cache-window',
  templateUrl: './create-monitor-form-cache-window.component.html',
  styleUrls: ['./create-monitor-form-cache-window.component.scss'],
})
export class CreateMonitorFormCacheWindowComponent implements OnInit {
  @Input()
  parent: FormGroup;

  private durationNames: string[] = [
    'off',
    '30 seconds',
    '1 minute',
    '2 minutes',
    '5 minutes',
    '10 minutes',
    '15 minutes',
    '30 minutes',
    '1 hour',
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
  public durationName: string;
  public min = 0;
  public max = this.durationNames.length - 1;

  // tslint:disable-next-line:max-line-length
  readonly tooltip = `This feature allows you to accumulate live events over the given period, with each new event being added to the cache. This means that when an esper event occurs the previous event data isn't simply deleted, but can still be viewed; however, it will be dropped from the cache once it reaches the cache limit value, as shown on the left.

Be careful how you use this feature as it could break your browser or cause the server to crash...`;

  onInputChange(event: MatSliderChange) {
    this.durationName = this.durationNames[event.value];
  }

  ngOnInit(): void {
    const value = this.parent.get('cacheWindow').value;
    this.durationName = this.durationNames[value];
  }
}
