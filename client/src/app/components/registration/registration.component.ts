import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  registerForm: FormGroup;

  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder, 
    public errorMessageService: ErrorMessageService, private userService: UserService, private toastrService: ToastrService, 
    public listService: ListService, private authService: AuthService) {
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
      this.userService.createUser(newUser).toPromise()
        .then(result => {
          if (result?.message && result.message === 'Duplicate') {
            this.toastrService.error(this.dictionaryService.get('IDUSED'), this.dictionaryService.get('ERR'));
          } else if (result) {
            this.authService.setSession(result);
            this.toastrService.success(this.dictionaryService.get('USRISCR'), this.dictionaryService.get('SUC'));
            this.router.navigate(['/login']);
          }
        })
        .catch(err => {
          this.toastrService.error(err.message, this.dictionaryService.get('ERR'));
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