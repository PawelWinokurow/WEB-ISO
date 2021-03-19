import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';
import { AccountService } from 'src/app/services/account.service';
import { ValidationService } from 'src/app/services/validation.service';
import { AccountJWT, Account, AccountDTO } from 'src/app/interfaces/account';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hide0 = true;
  hide1 = true;
  hide2 = true;
  accountForm: FormGroup;
  passwordForm: FormGroup;
  companyCode: FormControl;
  selected = this.authService.getAccount().companyCode;
  setting = 1;

  constructor(public dictionaryService: DictionaryService, private formBuilder: FormBuilder,
    public storageService: StorageService, private accountService: AccountService,
    public errorMessageService: ErrorMessageService, private authService: AuthService,
    public listService: ListService, private validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      username: new FormControl({ value: this.authService.getAccount().username, disabled: true }),
      email: new FormControl({ value: this.authService.getAccount().email, disabled: true }),
      companyCode: ['', [Validators.required]]
    });

    this.passwordForm = this.formBuilder.group({
      passwordOld: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.validationService.mustMatch('password', 'confirmPassword') });
  }

  change() {
    //If account form valid
    if (this.accountForm.valid) {
      var accountToChange = this.authService.getAccount();
      //If password doesn't update account without password
      if (this.passwordForm.controls['passwordOld'].value +
        this.passwordForm.controls['password'].value +
        this.passwordForm.controls['confirmPassword'].value === '') {
        accountToChange.companyCode = this.accountForm.controls['companyCode'].value;
        this.updateAccount(accountToChange)
      }
      //If password is changing and password form is valid update with password
      else if (this.passwordForm.valid) {
        accountToChange.password = this.passwordForm.controls['password'].value;
        accountToChange.passwordOld = this.passwordForm.controls['passwordOld'].value;
        accountToChange.companyCode = this.accountForm.controls['companyCode'].value;
        this.updateAccount(accountToChange)
      } else {
        //Trigger password form validation
        this.passwordForm.markAllAsTouched();
      }
    } else {
      //Trigger account form validation
      this.accountForm.markAllAsTouched();
    }
  }

  resetPasswordForm() {
    this.passwordForm.controls['passwordOld'].setValue('');
    this.passwordForm.controls['passwordOld'].markAsUntouched();
    this.passwordForm.controls['password'].setValue('');
    this.passwordForm.controls['password'].markAsUntouched();
    this.passwordForm.controls['confirmPassword'].setValue('');
    this.passwordForm.controls['confirmPassword'].markAsUntouched();
  }

  async updateAccount(accountToChange) {
    accountToChange.blocked = false;
    let accountResponse = await this.accountService.updateAccount<AccountDTO>(accountToChange).toPromise();
    if ('account' in accountResponse) {
      this.authService.setAccount(accountResponse.account);
    }
    this.resetPasswordForm();
  }

  get accountFormControl() {
    return this.accountForm.controls;
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }
}
