import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hydro-create-monitor-name',
  templateUrl: './create-monitor-name.component.html',
  styleUrls: ['./create-monitor-name.component.scss'],
})
export class CreateMonitorNameComponent implements OnInit {
  @Input()
  maxCharLength: number;

  public placeholder = `Please enter a monitor name`;
  public errors: string[];
  public errorMessages: { [key: string]: string } = {
    required: `You must enter a monitor name`,
    pattern: `Monitor name cannot contain punctuation marks, except dashes and underscores`,
    maxlength: `Monitor name must be ${this.maxCharLength} characters or less`,
  };

  @Input()
  parent: FormGroup;

  @Input()
  canEditName: boolean;

  ngOnInit(): void {
    this.errors = Object.keys(this.errorMessages);
    if (!this.canEditName) {
      this.parent.get('name').disable();
    }
  }

  public hasError(error: string): boolean {
    return this.parent.get('name').hasError(error);
  }
}
