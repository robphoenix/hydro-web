import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { CacheWindowService } from '../cache-window.service';

@Component({
  selector: 'hydro-create-monitor-form-cache-window',
  templateUrl: './create-monitor-form-cache-window.component.html',
  styleUrls: ['./create-monitor-form-cache-window.component.scss'],
})
export class CreateMonitorFormCacheWindowComponent implements OnInit {
  @Input()
  parent: FormGroup;

  public durationName: string;

  // tslint:disable-next-line:max-line-length
  readonly tooltip = `This feature allows you to accumulate live events over the given period, with each new event being added to the cache. This means that when an esper event occurs the previous event data isn't simply deleted, but can still be viewed; however, it will be dropped from the cache once it reaches the cache limit value, as shown on the left.

Be careful how you use this feature as it could break your browser or cause the server to crash!`;

  constructor(public cacheWindowService: CacheWindowService) {}

  onInputChange(event: MatSliderChange) {
    this.durationName = this.cacheWindowService.durationNames[event.value];
  }

  ngOnInit(): void {
    const value = this.parent.get('cacheWindow').value;
    this.durationName = this.cacheWindowService.durationNames[value];
  }
}
