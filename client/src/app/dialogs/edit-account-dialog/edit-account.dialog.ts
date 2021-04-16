import { Component,  Inject,  OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.dialog.html',
  styleUrls: ['./edit-account.dialog.scss']
})
export class EditAccountDialog implements OnInit {

  registerForm: FormGroup;
  account;

  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder, private formValidationService: FormValidationService,
    public errorMessageService: ErrorMessageService, public listService: ListService, private dialogRef: MatDialogRef<EditAccountDialog>, @Inject(MAT_DIALOG_DATA) public data) {
      this.account = data.accountToEdit;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl({ value: this.account.username, disabled: true }),
      email: new FormControl({ value: this.account.email, disabled: true }),

      salutation: [this.listService.salutationsPerson.getObjectForCode(this.account.salutationCode), Validators.required],
      companyCode: [this.listService.companyCodes.getObjectForCode(this.account.companyCode), [Validators.required]],
      firstName: [this.account.firstName, [Validators.required, this.formValidationService.validateName]],
      secondName: [this.account.secondName, [Validators.required, this.formValidationService.validateName]],
      phone: [this.account.phone, Validators.required],
      mobile: [this.account.mobile, Validators.required],
    });
  }

  close(){
    this.dialogRef.close();
  }

  async register() {
    if (this.registerForm.valid) {

      let editedAccount = { ... this.account};
      editedAccount.salutationCode = this.registerForm.controls['salutation'].value.code
      editedAccount.companyCode = this.registerForm.controls['companyCode'].value.code,
      editedAccount.firstName = this.registerForm.controls['firstName'].value,
      editedAccount.secondName = this.registerForm.controls['secondName'].value,
      editedAccount.phone = this.registerForm.controls['phone'].value,
      editedAccount.mobile = this.registerForm.controls['mobile'].value,
      this.dialogRef.close(editedAccount);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


}