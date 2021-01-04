import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * Header component
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private router: Router, public dictionaryService: DictionaryService, public storageService: StorageService){
    this.reset();
  }

  /**
   * If reset button is clicked, go to /preselection 
   */
  reset() {
    this.router.navigate(['/preselection']);
  }


  /**
   * If switch language button is clicked, change current language
   */
  changeLanguage(){
    this.dictionaryService.switchLanguage();
  }

}
