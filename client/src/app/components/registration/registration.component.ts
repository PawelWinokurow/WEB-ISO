import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  password2 = new FormControl('');

  constructor(private router: Router, public dictionaryService: DictionaryService, private storageService: StorageService) {
  }


  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/login']);
  }
}
