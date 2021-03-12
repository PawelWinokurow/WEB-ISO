import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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


  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService, private userService: UserService, 
    private toastr: ToastrService, public listService: ListService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().toPromise().then(users => this.users = users); 
    this.companyCodeDetails = this.listService.companyCodes.reduce((acc, x) => ({...acc, [x.code]: x.details}), {})
  }

  deleteUser(user){

  }

  blockUser(user){

  }

  resetPassword(user){

  }
}