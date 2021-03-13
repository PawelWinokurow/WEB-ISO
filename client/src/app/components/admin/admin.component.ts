import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
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
  companyCodeDetails;

  @ViewChild('accordion') accordion: MatAccordion;

  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService, private userService: UserService, 
    private toastr: ToastrService, public listService: ListService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().toPromise().then(users => this.users = users); 
    this.companyCodeDetails = this.listService.companyCodes.reduce((acc, x) => ({...acc, [x.code]: x.details}), {})
  }

  deleteUser(user){
    this.userService.deleteUser(user).toPromise()
    .then(msg => {
        this.toastr.success(this.dictionaryService.get('USD'), this.dictionaryService.get('SUC'));
    })
    .catch(err => {
      this.toastr.error(err.message, this.dictionaryService.get('ERR'));
    });
  }
  
  blockUser(user){
    var user = {...user, operation: 'block'};
    user.blocked = !user.blocked;
    console.log(user.blocked)
    this.userService.blockOrResetUser(user).toPromise()
    .then(userResp => {
        //TODO iterate over array may be to slow
        this.users.forEach(u => {
          if(u.email === userResp.email){
            u.blocked = userResp.blocked;
          }
        });
        if (userResp.blocked) {
          this.toastr.success(this.dictionaryService.get('USB'), this.dictionaryService.get('SUC'));
        } else {
          this.toastr.success(this.dictionaryService.get('USU'), this.dictionaryService.get('SUC'));
        }
    })
    .catch(err => {
      this.toastr.error(err.message, this.dictionaryService.get('ERR'));
    });
  }

  resetPassword(user){
    var user = {...user, operation: 'reset'};
    this.userService.blockOrResetUser(user).toPromise()
    .then(msg => {
        this.toastr.success(this.dictionaryService.get('PAR'), this.dictionaryService.get('SUC'));
    })
    .catch(err => {
      this.toastr.error(err.message, this.dictionaryService.get('ERR'));
    });
  }
}