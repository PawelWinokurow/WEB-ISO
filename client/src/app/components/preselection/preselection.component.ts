import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-preselection',
  templateUrl: './preselection.component.html',
  styleUrls: ['./preselection.component.scss']
})
export class PreselectionComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router, public dictionaryService: DictionaryService) { }

  ngOnInit(): void {}

  changeCustomerType(event: any) {
    if (event.value === 'organization') {
      this.storageService.customerType = 'organization';
    } else {
      this.storageService.customerType = 'person';
    }
  }

  changeDebitCreditType(event: any) {
    if (event.value === 'credit') {
      this.storageService.debitCreditType = 'credit';
    } else {
      this.storageService.debitCreditType = 'debit';
    }
  }

  onClick(){
    this.router.navigate(['/iso']);
  }
}
