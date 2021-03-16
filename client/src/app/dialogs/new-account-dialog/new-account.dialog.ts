import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.dialog.html',
  styleUrls: ['./new-account.dialog.scss']
})
export class NewAccountDialog implements OnInit {

  hide1 = true;
  hide2 = true;
  registerForm: FormGroup;
  accountType = 'USER';

  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService, public listService: ListService, private dialogRef: MatDialogRef<NewAccountDialog>) {
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
      var newAccount = {
        username: this.registerForm.controls['username'].value,
        email: this.registerForm.controls['email'].value,
        companyCode: this.registerForm.controls['companyCode'].value.code,
        role: this.accountType,
        blocked: false
      }
      this.dialogRef.close(newAccount);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

    /**
   * Change of admin/account type triggers this method.
   * @param event Change event
   */
     changeAccountType(event: any) {
      if (event.value === 'USER') {
        this.accountType = 'USER';
      } else {
        this.accountType = 'ADMIN';
      }
    }
}