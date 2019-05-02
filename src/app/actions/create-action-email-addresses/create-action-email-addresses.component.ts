import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'hydro-create-action-email-addresses',
  templateUrl: './create-action-email-addresses.component.html',
  styleUrls: ['./create-action-email-addresses.component.scss'],
})
export class CreateActionEmailAddressesComponent {
  public validationMessage = `You must specify a valid bet365 email address`;

  @Input()
  parent: FormGroup;

  @Output()
  addEmailAddress = new EventEmitter();

  @Output()
  removeEmailAddress = new EventEmitter<number>();

  public add() {
    this.addEmailAddress.emit(this.parent);
  }

  public remove(index: number) {
    this.removeEmailAddress.emit(index);
  }

  public get addresses(): AbstractControl[] {
    return (this.parent.get(`emailAddresses`) as FormArray).controls;
  }

  public invalidBet365Email(index: number): boolean {
    return this.addresses[index]
      .get(`emailAddress`)
      .hasError(`validBet365Email`);
  }

  public get disabled(): boolean {
    return this.parent.get(`emailAddresses`).invalid;
  }
}
