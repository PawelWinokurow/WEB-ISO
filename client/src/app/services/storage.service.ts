import { Injectable } from '@angular/core';

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
    localStorage.setItem('debit_credit_type', 'debitor');
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
