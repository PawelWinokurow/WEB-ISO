import { AfterViewInit, ChangeDetectorRef, Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

/**
 * Temporarily stores the data. 
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Resets preselection types.
   */
  resetValues() {
    localStorage.setItem('customer_type', 'person');
    localStorage.setItem('debit_credit_type', 'debit');
  }

  get customerType() {
    return localStorage.getItem("customer_type")
  }

  get debitCreditType() {
    return localStorage.getItem("debit_credit_type")
  }

  set customerType(customerType: string) {
    localStorage.setItem('customer_type', customerType);
  }

  set debitCreditType(debitCreditType: string) {
    localStorage.setItem('debit_credit_type', debitCreditType);
  }

}
