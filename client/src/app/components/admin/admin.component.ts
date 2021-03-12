import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  changeForm: FormGroup;
  companyCode: FormControl;
  selected = this.authService.getUser().companyCode;


  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder, public storageService: StorageService,
    public errorMessageService: ErrorMessageService, private authService: AuthService, private toastr: ToastrService, public listService: ListService) {
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      //TODO username:only letters and no @
      username: new FormControl({ value: this.authService.getUser().username, disabled: true }, Validators.required),
      email: new FormControl({ value: this.authService.getUser().email, disabled: true }, [Validators.required, Validators.email]),
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

      this.authService.updateUser(user).toPromise()
        .then(user => {
          console.log(user)
          this.authService.setUser(user);
          this.toastr.success(this.dictionaryService.get('UWU'), this.dictionaryService.get('SUC'));
        })
        .catch(err => {
          this.toastr.error(`${this.dictionaryService.get('UWN')}: ${err}`, this.dictionaryService.get('ERR'));
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
