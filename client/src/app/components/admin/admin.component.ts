import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { DeleteAccountDialog } from 'src/app/dialogs/delete-account-dialog/delete-account.dialog';
import { NewAccountDialog } from 'src/app/dialogs/new-account-dialog/new-account.dialog';
import { ResetPasswordDialog } from 'src/app/dialogs/reset-password/reset-password.dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users;
  filteredAccounts;
  companyCodeDetails;
  filter: FormControl = new FormControl('');

  @ViewChild('accordion') accordion: MatAccordion;

  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService,
    private userService: AccountService, public listService: ListService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.fetchAccounts();
    this.initAccountSearch();
    this.companyCodeDetails = this.listService.companyCodes.reduce((acc, x) => ({ ...acc, [x.code]: x.details }), {})
  }

  async fetchAccounts(){
    this.users = await this.userService.getAccounts().toPromise();
    this.sortByUsername(this.users);
    this.filteredAccounts = [...this.users];
  }

  async initAccountSearch() {
    this.filter.valueChanges.subscribe(val => {
      this.filterQuery(val);
    });
  }

  filterQuery(val){
    var val = val.toLowerCase();
    this.filteredAccounts = this.users.filter(user =>
      user.username.toLowerCase().includes(val)
      || user.email.toLowerCase().includes(val)
      || this.companyCodeDetails[user.companyCode].toLowerCase().includes(val)
      || user.role.toLowerCase().includes(val)
    );
  }

  sortByUsername(array){
    array.sort(function(a, b) {
      var nameA = a.username.toLowerCase();
      var nameB = b.username.toLowerCase();
      return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
    });
  }

  async newAccount() {
    const newAccountDialog = this.dialog.open(NewAccountDialog);
    const result = await newAccountDialog.afterClosed().toPromise();
    if (result) {
      await this.userService.createAccount(result).toPromise();
      this.users.push(result);
      this.sortByUsername(this.users);
      this.filterQuery(this.filter.value);
    }
  }

  async deleteAccount(userToSend) {
    const deleteAccountDialog = this.dialog.open(DeleteAccountDialog, {
      data: {
        username: userToSend.username
      }
    });
    const result = await deleteAccountDialog.afterClosed().toPromise();
    if (result) {
      try {
        await this.userService.deleteAccount(userToSend).toPromise();
        //TODO iterate over array may be to slow
        this.users = this.users.filter(u => u.email != userToSend.email);
        this.filteredAccounts = this.filteredAccounts.filter(u => u.email != userToSend.email);
      } catch (e) { }
    }
  }

  async blockAccount(userToBlock) {
    try {
      var user = { ...userToBlock, operation: 'block' };
      user.blocked = !user.blocked;
      const res = await this.userService.blockOrResetAccount(user).toPromise();

      //TODO iterate over array may be to slow
      this.users.forEach(u => {
        if (u.email === res.user.email) {
          u.blocked = res.user.blocked;
        }
      });
      this.filteredAccounts.forEach(u => {
        if (u.email === res.user.email) {
          u.blocked = res.user.blocked;
        }
      });
    } catch (e) { }
  }

  async resetPassword(userToReset) {
    const resetPasswordDialog = this.dialog.open(ResetPasswordDialog, {
      data: {
        username: userToReset.username
      }
    });
    const result = await resetPasswordDialog.afterClosed().toPromise();
    if (result) {
      const user = { ...userToReset, operation: 'reset' };
      await this.userService.blockOrResetAccount(user).toPromise();
    }
  }
}