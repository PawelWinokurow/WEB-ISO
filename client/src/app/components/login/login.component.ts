import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  hide = true;
  username = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, public dictionaryService: DictionaryService){
    //this.router.navigate(['/main'])
  }

  login(){
    console.log("login");
    this.router.navigate(['/new-kea'])
  }
}
