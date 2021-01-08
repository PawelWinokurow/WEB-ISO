import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * Allows to choose the customer type, credit/debit type and company code.
 */
@Component({
  selector: 'app-preselection',
  templateUrl: './preselection.component.html',
  styleUrls: ['./preselection.component.scss']
})
export class PreselectionComponent implements OnInit {

  companyCode: FormControl;

  constructor(public storageService: StorageService, private router: Router, public dictionaryService: DictionaryService, public listService: ListService, public errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
    this.companyCode = new FormControl('', [Validators.required]);
    this.storageService.resetValues();
    // Subscribe companyCode: set companyCode in StorageService to selected value
    this.companyCode.valueChanges.subscribe(() => this.storageService.companyCode = this.companyCode.value.details);
  }

  /**
   * Change of customer type triggers this method. The method set customerType in storageService. 
   * @param event change event
   */
  changeCustomerType(event: any) {
    if (event.value === 'organization') {
      this.storageService.customerType = 'organization';
    } else {
      this.storageService.customerType = 'person';
    }
  }

  /**
   * Change of debit/credit type triggers this method. The method set debit/credit in storageService. 
   * @param event change event
   */
  changeDebitCreditType(event: any) {
    if (event.value === 'credit') {
      this.storageService.debitCreditType = 'credit';
    } else {
      this.storageService.debitCreditType = 'debit';
    }
  }

  /**
   * Click on the "generate mask" button triggers this method. The method navigates to the NewISOComponent. 
   */
  onGenerateMask(){
    this.router.navigate(['/iso']);
  }
}
