import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private router: Router, public dictionaryService: DictionaryService, private storageService: StorageService, 
    private authService: AuthService) {
    //this.router.navigate(['/main'])
  }


  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe(result => {
      if (result) {
        this.storageService.isLoggedIn = true;
        this.router.navigate(['/preselection']);
      } else {
       //TODO error message 
      }
    });


  }

  register() {
    console.log("register");
    this.router.navigate(['/registration']);
  }

}
