import { Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  customerType = 'person';
  debitCreditType = 'debit';
  companyCode = ''

  constructor(private dictionaryService: DictionaryService) { }

  resetValues() {
    this.customerType = 'person';
    this.debitCreditType = 'debit';
    this.companyCode = ''
  }

  getCustomerTypeName(){
    return this.customerType === 'person' ? this.dictionaryService.get('PER') : this.dictionaryService.get('ORG');
  }

  getDebitCreditTypeName(){
    return this.debitCreditType === 'debit' ? this.dictionaryService.get('DEB') : this.dictionaryService.get('CRE');
  }

  getCompanyCodeName() {
    return this.companyCode;
  }

}
