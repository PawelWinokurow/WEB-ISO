import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenProlongationService } from 'src/app/services/token-prolongation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hide0 = true;
  hide1 = true;
  hide2 = true;
  changeForm: FormGroup;
  companyCode: FormControl;
  selected = this.authService.getUser().companyCode;
  changePassword = false;


  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    public storageService: StorageService, private userService: UserService, private tokenProlongationService: TokenProlongationService,
    public errorMessageService: ErrorMessageService, private authService: AuthService, private toastrService: ToastrService,
    public listService: ListService, private router: Router) {
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      username: new FormControl({ value: this.authService.getUser().username, disabled: true }),
      email: new FormControl({ value: this.authService.getUser().email, disabled: true }),
      companyCode: ['', [Validators.required]],
    });
  }

  setPassword() {
    this.changePassword = !this.changePassword;
    if (this.changePassword) {
      this.changeForm.addControl('passwordOld', new FormControl('', Validators.required));
      this.changeForm.addControl('password', new FormControl('', Validators.required));
      this.changeForm.addControl('confirmPassword', new FormControl('', Validators.required));
      this.changeForm.setValidators([MustMatch('password', 'confirmPassword')]);
    } else {
      this.changeForm.setValidators(null);
      this.changeForm.removeControl('passwordOld');
      this.changeForm.removeControl('password');
      this.changeForm.removeControl('confirmPassword');
    }
  }

  async change() {
    if (this.changeForm.valid) {
      var userToChange = this.authService.getUser();
      if (this.changePassword) {
        userToChange.password = this.changeForm.controls['password'].value;
        userToChange.passwordOld = this.changeForm.controls['passwordOld'].value;
      }
      userToChange.companyCode = this.changeForm.controls['companyCode'].value;
      userToChange.blocked = false;
      let userResponse = await this.userService.updateUser(userToChange).toPromise()
      if ('user' in userResponse) {
        this.authService.setUser(userResponse.user);
        if (this.changePassword) this.setPassword();
      }
    } else {
      this.changeForm.markAllAsTouched();
    }
  }

  get changeFormControl() {
    return this.changeForm.controls;
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
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
