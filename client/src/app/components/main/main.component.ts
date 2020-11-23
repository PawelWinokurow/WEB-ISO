import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mask } from 'src/app/interfaces/mask';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { HttpService } from 'src/app/services/http.service';
import { SOAPService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, public dictionaryService: DictionaryService){
    this.router.navigate(['/iso']);
  }

  reset() {
    window.location.reload()
  }

  ngOnInit(): void {
  }

  changeLanguage(){
    this.dictionaryService.switchLanguage();
  }

}
