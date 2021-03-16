import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';

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

  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
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
        username: this.registerForm.controls['username'].value,
        email: this.registerForm.controls['email'].value,
        companyCode: this.registerForm.controls['companyCode'].value.code,
        role: this.userType,
        blocked: false
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