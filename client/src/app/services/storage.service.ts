import { Injectable } from '@angular/core';
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

  constructor(private dictionaryService: DictionaryService) { }

  /**
   * Resets preselection types.
   */
  resetValues() {
    this.customerType = 'person';
    this.debitCreditType = 'debit';
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
