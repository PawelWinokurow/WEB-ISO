import { Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

/**
 * Temporarily stores the data. 
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dictionaryService: DictionaryService) { }

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

  /**
   * Gets the selected client type.
   * @returns Customer type value.
   */
  getCustomerTypeName(): string {
    return this.customerType === 'person' ? this.dictionaryService.get('PER') : this.dictionaryService.get('ORG');
  }

  /**
   * Gets the selected debit/credit type.
   * @returns Debit/credit type value.
   */
  getDebitCreditTypeName(): string {
    return this.debitCreditType === 'debit' ? this.dictionaryService.get('DEB') : this.dictionaryService.get('CRE');
  }

}
