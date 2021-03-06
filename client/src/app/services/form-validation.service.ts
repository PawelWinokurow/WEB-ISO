import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  // custom validator to check that two fields match
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  validateUsername(c: FormControl) {
    const pattern = /^[a-zA-Z0-9_]*$/
    return pattern.test(c.value) ? null : {
      validateUsername: {
        valid: false
      }
    };
  }

  validateName(c: FormControl) {
    const pattern = /^[a-zA-Z\']*$/
    return pattern.test(c.value) ? null : {
      validateName: {
        valid: false
      }
    };
  }
}
