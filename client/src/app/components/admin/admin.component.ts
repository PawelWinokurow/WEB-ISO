import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { DeleteUserDialog } from 'src/app/dialogs/delete-user-dialog/delete-user.dialog';
import { NewUserDialog } from 'src/app/dialogs/new-user-dialog/new-user.dialog';
import { ResetPasswordDialog } from 'src/app/dialogs/reset-password/reset-password.dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users;
  filteredUsers;
  companyCodeDetails;
  filter: FormControl = new FormControl('');

  @ViewChild('accordion') accordion: MatAccordion;

  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService,
    private userService: UserService, public listService: ListService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.initUserSearch();
    this.companyCodeDetails = this.listService.companyCodes.reduce((acc, x) => ({ ...acc, [x.code]: x.details }), {})
  }

  async fetchUsers(){
    this.users = await this.userService.getUsers().toPromise();
    this.sortByUsername(this.users);
    this.filteredUsers = [...this.users];
  }

  async initUserSearch() {
    this.filter.valueChanges.subscribe(val => {
      this.filterQuery(val);
    });
  }

  filterQuery(val){
    var val = val.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
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

  async newUser() {
    const newUserDialog = this.dialog.open(NewUserDialog);
    const result = await newUserDialog.afterClosed().toPromise();
    if (result) {
      await this.userService.createUser(result).toPromise();
      this.users.push(result);
      this.sortByUsername(this.users);
      this.filterQuery(this.filter.value);
    }
  }

  async deleteUser(userToSend) {
    const deleteUserDialog = this.dialog.open(DeleteUserDialog, {
      data: {
        username: userToSend.username
      }
    });
    const result = await deleteUserDialog.afterClosed().toPromise();
    if (result) {
      try {
        await this.userService.deleteUser(userToSend).toPromise();
        //TODO iterate over array may be to slow
        this.users = this.users.filter(u => u.email != userToSend.email);
        this.filteredUsers = this.filteredUsers.filter(u => u.email != userToSend.email);
      } catch (e) { }
    }
  }

  async blockUser(userToBlock) {
    try {
      var user = { ...userToBlock, operation: 'block' };
      user.blocked = !user.blocked;
      const res = await this.userService.blockOrResetUser(user).toPromise();

      //TODO iterate over array may be to slow
      this.users.forEach(u => {
        if (u.email === res.user.email) {
          u.blocked = res.user.blocked;
        }
      });
      this.filteredUsers.forEach(u => {
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
      await this.userService.blockOrResetUser(user).toPromise();
    }
  }
}