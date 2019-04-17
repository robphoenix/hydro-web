import { AbstractControl } from '@angular/forms';

export function ValidateBet365Email(control: AbstractControl) {
  const regex: RegExp = new RegExp(/\S+\.\S+@bet365\.com/, 'gi');
  const value = control.value || ``;
  const match = value.match(regex);
  if (!match) {
    return { validBet365Email: true };
  }
  return null;
}
