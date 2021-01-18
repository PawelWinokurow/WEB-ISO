import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class MainComponent {

  constructor(private router: Router, public dictionaryService: DictionaryService, public storageService: StorageService){
    this.reset();
  }

  /**
   * Click on the reset button triggers this method. The method navigates to the PreselectionComponent.
   */
  reset() {
    this.router.navigate(['/preselection']);
  }


  /**
   * Click on the switch language button triggers this method. The method changes the current language from EN to DE and from DE to EN.
   */
  changeLanguage(){
    this.dictionaryService.switchLanguage();
  }

}
