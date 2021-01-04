import { Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

/**
 * Service to temporarily store data 
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  customerType: string = 'person';
  debitCreditType: string = 'debit';
  companyCode: string = '';

  constructor(private dictionaryService: DictionaryService) { }

  /**
   * Resets preselection types
   */
  resetValues() {
    this.customerType = 'person';
    this.debitCreditType = 'debit';
    this.companyCode = '';
  }

  /**
   * Gets customer type
   * @returns customer type value
   */
  getCustomerTypeName(): string {
    return this.customerType === 'person' ? this.dictionaryService.get('PER') : this.dictionaryService.get('ORG');
  }

  /**
   * Gets debit or credit type
   * @returns debit or credit type value
   */
  getDebitCreditTypeName(): string {
    return this.debitCreditType === 'debit' ? this.dictionaryService.get('DEB') : this.dictionaryService.get('CRE');
  }

  /**
   * Gets company code
   * @returns company code value
   */
  getCompanyCodeName(): string {
    return this.companyCode;
  }

}
