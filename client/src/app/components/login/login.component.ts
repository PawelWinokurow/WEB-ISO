import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  username = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, public dictionaryService: DictionaryService, private storageService: StorageService) {
    //this.router.navigate(['/main'])
  }


  ngOnInit(): void {
  }

  login() {
    console.log("login");
    this.storageService.isLoggedIn = true;
    this.router.navigate(['/preselection']);
  }

  register() {
    console.log("register");
    this.router.navigate(['/registration']);
  }

}
