import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  changeForm: FormGroup;
  submitted = false;
  companyCode: FormControl;


  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder, private storageService: StorageService,
    public errorMessageService: ErrorMessageService, private authService: AuthService, private toastr: ToastrService, public listService: ListService) {
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      //TODO username:only letters and no @
      username: new FormControl({value: this.storageService.user.username, disabled: true}, Validators.required),
      email: new FormControl({value: this.storageService.user.email, disabled: true}, [Validators.required, Validators.email]),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      companyCode: [this.storageService.user.companyCode, [Validators.required]],
    },
    { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  change() {
    /*
    this.submitted = true;
    if (this.changeForm.valid) {
      var newUser = {
        username: this.changeForm.controls['username'].value,
        password: this.changeForm.controls['password'].value,
        email: this.changeForm.controls['email'].value,
        companyCode: this.changeForm.controls['companyCode'].value.code
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
          this.toastr.error(err, this.dictionaryService.get('ERR'));
        });
    } else {
      this.changeForm.markAllAsTouched();
    }
    */
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
