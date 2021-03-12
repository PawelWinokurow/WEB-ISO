import { Component, OnInit } from '@angular/core';
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


  constructor(public storageService: StorageService, private router: Router, public dictionaryService: DictionaryService, 
    public listService: ListService, public errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
  }

  /**
   * Change of customer type triggers this method. The method set customerType in storageService. 
   * @param event Change event
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
   * @param event Change event
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
