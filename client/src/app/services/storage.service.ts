import { Injectable } from '@angular/core';
import { CodeDetails } from '../interfaces/lists';
import { DictionaryService } from './dictionary.service';

/**
 * Temporarily stores the data. 
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  customerType: string = 'person';
  debitCreditType: string = 'debit';
  companyCode: CodeDetails = null;
  isLoggedIn = false

  constructor(private dictionaryService: DictionaryService) { }

  /**
   * Resets preselection types.
   */
  resetValues() {
    this.customerType = 'person';
    this.debitCreditType = 'debit';
    this.companyCode = null;
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

  /**
   * Gets the selected company code.
   * @returns Company code value.
   */
  getCompanyCodeName(): string {
    return this.companyCode.details;
  }

}
