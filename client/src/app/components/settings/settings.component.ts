import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  hide1 = true;
  hide2 = true;
  changeForm: FormGroup;
  companyCode: FormControl;
  selected = this.authService.getUser().companycode;


  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    public storageService: StorageService, private userService: UserService, private tokenProlongationService: TokenProlongationService,
    public errorMessageService: ErrorMessageService, private authService: AuthService, private toastr: ToastrService,
    public listService: ListService, private router: Router) {
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      username: new FormControl({ value: this.authService.getUser().username, disabled: true }),
      email: new FormControl({ value: this.authService.getUser().email, disabled: true }),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      companyCode: ['', [Validators.required]],
    },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  change() {
    if (this.changeForm.valid) {
      var user = this.authService.getUser();
      user.password = this.changeForm.controls['password'].value;
      user.companyCode = this.changeForm.controls['companyCode'].value;
      user.blocked = false;
      this.userService.updateUser(user).toPromise()
        .then(() => this.toastr.success(this.dictionaryService.get('UWU'), this.dictionaryService.get('SUC')))
        .catch(err => this.toastr.error(`${this.dictionaryService.get('UWN')}: ${err}`, this.dictionaryService.get('ERR')))
        .then(() => this.authService.login(user.email, user.password))
        .catch(err => this.toastr.error(err.message, this.dictionaryService.get('ERR')))
        .then(() => {
          this.tokenProlongationService.startChecking();
          this.router.navigate(['/preselection']);
        });
    } else {
      this.changeForm.markAllAsTouched();
    }
  }

  get changeFormControl() {
    return this.changeForm.controls;
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
