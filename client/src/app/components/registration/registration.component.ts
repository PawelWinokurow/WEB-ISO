import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  registerForm: FormGroup;

  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder, private storageService: StorageService,
    public errorMessageService: ErrorMessageService, private authService: AuthService, private toastr: ToastrService, public listService: ListService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      //TODO username:only letters and no @
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      companyCode: ['', [Validators.required]],
    },
    { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  register() {
    if (this.registerForm.valid) {
      var newUser = {
        username: this.registerForm.controls['username'].value,
        password: this.registerForm.controls['password'].value,
        email: this.registerForm.controls['email'].value,
        companyCode: this.registerForm.controls['companyCode'].value.code,
        role: 'USER'
      }
      this.authService.createUser(newUser).toPromise()
        .then(msg => {
          if (msg["message"] === 'Duplicate') {
            this.toastr.error(this.dictionaryService.get('UAE'), this.dictionaryService.get('ERR'));
          } else {
            this.toastr.success(this.dictionaryService.get('UWC'), this.dictionaryService.get('SUC'));
            this.router.navigate(['/login']);
          }
        })
        .catch(err => {
          this.toastr.error(err.message, this.dictionaryService.get('ERR'));
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  back() {
    this.router.navigate(['/login']);
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
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