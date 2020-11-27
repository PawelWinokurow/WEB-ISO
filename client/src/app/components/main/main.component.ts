import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, public dictionaryService: DictionaryService, public storageService: StorageService){
    this.reset();
  }

  ngOnInit(): void {
  }

  reset() {
    this.router.navigate(['/preselection']);
  }

  changeLanguage(){
    this.dictionaryService.switchLanguage();
  }

}
