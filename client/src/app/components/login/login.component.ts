import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  identifier = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, public dictionaryService: DictionaryService, private storageService: StorageService, 
    private toastr: ToastrService, private authService: AuthService) {}


  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.identifier.value, this.password.value)
    .then(result => {
        this.storageService.isLoggedIn = true;
        this.router.navigate(['/preselection']);
        console.log(result)
      })
    .catch(err => {
      this.toastr.error(this.dictionaryService.get('ICL'), this.dictionaryService.get('ERR'))
      console.log(err)
    });
  }

  register() {
    this.router.navigate(['/registration']);
  }

}
