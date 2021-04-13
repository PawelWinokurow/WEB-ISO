import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { DeleteAccountDialog } from 'src/app/dialogs/delete-account-dialog/delete-account.dialog';
import { NewAccountDialog } from 'src/app/dialogs/new-account-dialog/new-account.dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { AccountService } from 'src/app/services/account.service';
import { ResetPasswordAdminDialog } from 'src/app/dialogs/reset-password-admin/reset-password-admin.dialog';
import { AccountDTO } from 'src/app/interfaces/account';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  accounts;
  filteredAccounts;
  companyCodeDetails;
  filter: FormControl = new FormControl('');

  @ViewChild('accordion') accordion: MatAccordion;

  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService,
    private accountService: AccountService, public listService: ListService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.fetchAccounts();
    this.initAccountSearch();
    this.companyCodeDetails = this.listService.companyCodes.reduce((acc, x) => ({ ...acc, [x.code]: x.details }), {})
  }

  async fetchAccounts() {
    try {
      this.accounts = await this.accountService.getAccounts().toPromise();
      this.sortByUsername(this.accounts);
      this.filteredAccounts = [...this.accounts];
    } catch (e) {
      console.error(e.stack);
    }
  }

  initAccountSearch() {
    this.filter.valueChanges.subscribe(val => {
      this.filterQuery(val);
    });
  }

  filterQuery(val) {
    var val = val.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.username.toLowerCase().includes(val)
      || account.email.toLowerCase().includes(val)
      || this.companyCodeDetails[account.companyCode].toLowerCase().includes(val)
      || account.role.toLowerCase().includes(val)
    );
  }

  sortByUsername(array) {
    array.sort(function (a, b) {
      var nameA = a.username.toLowerCase();
      var nameB = b.username.toLowerCase();
      return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
    });
  }

  async newAccount() {
    const newAccountDialog = this.dialog.open(NewAccountDialog);
    const result = await newAccountDialog.afterClosed().toPromise();
    if (result) {
      await this.accountService.createAccount(result).toPromise();
      this.accounts.push(result);
      this.sortByUsername(this.accounts);
      this.filterQuery(this.filter.value);
    }
  }

  async deleteAccount(accountToSend) {
    const deleteAccountDialog = this.dialog.open(DeleteAccountDialog, {
      data: {
        username: accountToSend.username
      }
    });
    const result = await deleteAccountDialog.afterClosed().toPromise();
    if (result) {
      try {
        await this.accountService.deleteAccount(accountToSend).toPromise();
        //TODO iterate over array may be to slow
        this.accounts = this.accounts.filter(u => u.email != accountToSend.email);
        this.filteredAccounts = this.filteredAccounts.filter(u => u.email != accountToSend.email);
      } catch (e) { }
    }
  }

  async blockAccount(accountToBlock) {
    try {
      accountToBlock.blocked = !accountToBlock.blocked;
      const accountResponse = await this.accountService.blockAccount<AccountDTO>(accountToBlock).toPromise();

      if ('account' in accountResponse) {
        //TODO iterate over array may be to slow
        this.accounts.forEach(u => {
          if (u.email === accountResponse.account.email) {
            u.blocked = accountResponse.account.blocked;
          }
        });
        this.filteredAccounts.forEach(u => {
          if (u.email === accountResponse.account.email) {
            u.blocked = accountResponse.account.blocked;
          }
        });
      }
    } catch (e) { }
  }

  async resetPassword(accountToReset) {
    const resetPasswordDialog = this.dialog.open(ResetPasswordAdminDialog, {
      data: {
        username: accountToReset.username
      }
    });
    const result = await resetPasswordDialog.afterClosed().toPromise();
    if (result) {
      await this.accountService.requestPasswordReset(accountToReset).toPromise();
    }
  }
}

