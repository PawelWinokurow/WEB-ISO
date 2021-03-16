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
  userType = 'USER';

  constructor(private router: Router, public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService, public listService: ListService, private dialogRef: MatDialogRef<NewUserDialog>) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      //TODO username:only letters and no @
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      companyCode: ['', [Validators.required]],
    });
  }

  close(){
    this.dialogRef.close();
  }

  async register() {
    if (this.registerForm.valid) {
      var newUser = {
        email: this.registerForm.controls['email'].value,
        companyCode: this.registerForm.controls['companyCode'].value.code,
        role: this.userType
      }
      this.dialogRef.close(newUser);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

    /**
   * Change of admin/user type triggers this method.
   * @param event Change event
   */
     changeUserType(event: any) {
      if (event.value === 'USER') {
        this.userType = 'USER';
      } else {
        this.userType = 'ADMIN';
      }
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