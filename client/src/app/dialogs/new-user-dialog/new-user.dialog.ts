import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.dialog.html',
  styleUrls: ['./new-user.dialog.scss']
})
export class NewUserDialog implements OnInit {

  hide1 = true;
  hide2 = true;
  registerForm: FormGroup;

  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService, private userService: UserService,
    public listService: ListService, private authService: AuthService, private dialogRef: MatDialogRef<NewUserDialog>) {
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

  close(){
    this.dialogRef.close();
  }

  async register() {
    if (this.registerForm.valid) {
      var newUser = {
        username: this.registerForm.controls['username'].value,
        password: this.registerForm.controls['password'].value,
        email: this.registerForm.controls['email'].value,
        companyCode: this.registerForm.controls['companyCode'].value.code,
        role: 'USER'
      }
      await this.userService.createUser(newUser).toPromise();
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
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