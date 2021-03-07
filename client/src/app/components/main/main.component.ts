import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * Contains application  header and is also the parent component of the NewISOComponent.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, public dictionaryService: DictionaryService, 
    public storageService: StorageService, public authService: AuthService){
  }
  ngOnInit(): void {
    this.storageService.user = JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Click on the reset button triggers this method. The method navigates to the LoginComponent.
   */
  reset() {
    this.router.navigate(['/login']);
  }

  /**
   * Click on the logout button triggers this method. The method navigates to the LoginComponent.
   */
  logout() {
    this.authService.logout();
    this.reset();
  }


  /**
   * Click on the switch language button triggers this method. The method changes the current language from EN to DE and from DE to EN.
   */
  changeLanguage(){
    this.dictionaryService.switchLanguage();
  }

}
