import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { SOAPService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private soapService: SOAPService, private router: Router, public dictionaryService: DictionaryService){
    this.router.navigate(['/login'])
    //this.router.navigate(['/new-kea'])
  }
  ngOnInit(): void {
  }

  changeLanguage(){
    this.dictionaryService.switchLanguage();
  }

}
