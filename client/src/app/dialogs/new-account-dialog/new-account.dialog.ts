import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
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

  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder, private formValidationService: FormValidationService,
    public errorMessageService: ErrorMessageService, public listService: ListService, private dialogRef: MatDialogRef<NewAccountDialog>) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, this.formValidationService.validateUsername]],
      email: ['', [Validators.required, Validators.email]],
      salutation: [this.listService.salutationsPerson[0], Validators.required],
      companyCode: ['', [Validators.required]],
      firstName: ['', [Validators.required, this.formValidationService.validateName]],
      secondName: ['', [Validators.required, this.formValidationService.validateName]],
      phone: [''],
      mobile: [''],
    });
  }

  close(){
    this.dialogRef.close();
  }

  async register() {
    if (this.registerForm.valid) {
      const salutationCode = this.registerForm.controls['salutation'].value === '' ? '0000' : this.registerForm.controls['salutation'].value.code
      var newAccount = {
        username: this.registerForm.controls['username'].value,
        email: this.registerForm.controls['email'].value,
        firstName: this.registerForm.controls['firstName'].value,
        secondName: this.registerForm.controls['secondName'].value,
        phone: this.registerForm.controls['phone'].value,
        mobile: this.registerForm.controls['mobile'].value,
        companyCode: this.registerForm.controls['companyCode'].value.code,
        salutationCode: salutationCode,
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