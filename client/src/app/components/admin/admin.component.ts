import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import { DeleteUserDialogComponent } from 'src/app/dialogs/delete-user-dialog/delete-user-dialog.component';
import { ResetPasswordDialogComponent } from 'src/app/dialogs/reset-password/reset-password-dialog.component';
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

  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService, private userService: UserService,
    private toastrService: ToastrService, public listService: ListService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.userService.getUsers().toPromise()
      .then(users => this.users = users)
      .then(() => this.filteredUsers = [...this.users])
      .then(() => {
        this.filter.valueChanges.subscribe(val => {
          var val = val.toLowerCase();
          this.filteredUsers = this.users.filter(user => 
            user.username.toLowerCase().includes(val) 
            || user.email.toLowerCase().includes(val) 
            || this.companyCodeDetails[user.companyCode].toLowerCase().includes(val) 
            || user.role.toLowerCase().includes(val)
          );
        });
      });

    this.companyCodeDetails = this.listService.companyCodes.reduce((acc, x) => ({ ...acc, [x.code]: x.details }), {})
  }

  deleteUser(user) {
    const userToSend = user;
    const deleteUserDialog = this.dialog.open(DeleteUserDialogComponent, {
      data: {
        username: userToSend.username
      }
    });
    deleteUserDialog.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(userToSend).toPromise()
          .then(res => {
            //TODO iterate over array may be to slow
            this.users = this.users.filter(u => u.email != userToSend.email);
            this.toastrService.success(this.dictionaryService.get('USRISDEL'), this.dictionaryService.get('SUC'));
          })
          .catch(err => {
            this.toastrService.error(err.message, this.dictionaryService.get('ERR'));
          });
      }
    });
  }

  blockUser(user) {
    var user = { ...user, operation: 'block' };
    user.blocked = !user.blocked;
    this.userService.blockOrResetUser(user).toPromise()
      .then(userResp => {
        //TODO iterate over array may be to slow
        this.users.forEach(u => {
          if (u.email === userResp.email) {
            u.blocked = userResp.blocked;
          }
        });
        if (userResp.blocked) {
          this.toastrService.success(this.dictionaryService.get('USRISBL'), this.dictionaryService.get('SUC'));
        } else {
          this.toastrService.success(this.dictionaryService.get('USRISUN'), this.dictionaryService.get('SUC'));
        }
      })
      .catch(err => {
        this.toastrService.error(err.message, this.dictionaryService.get('ERR'));
      });
  }

  resetPassword(user) {
    const userToSend = user;
    const resetPasswordDialog = this.dialog.open(ResetPasswordDialogComponent, {
      data: {
        username: userToSend.username
      }
    });
    resetPasswordDialog.afterClosed().subscribe(result => {
      if (result) {
        const user = { ...userToSend, operation: 'reset' };
        this.userService.blockOrResetUser(user).toPromise()
          .then(res => {
            this.toastrService.success(this.dictionaryService.get('PSWDISRES'), this.dictionaryService.get('SUC'));
          })
          .catch(err => {
            this.toastrService.error(err.message, this.dictionaryService.get('ERR'));
          });
      }
    });
  }
}