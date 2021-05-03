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

  debitCreditType = 'debitor';
  customerType = 'person';

  constructor(public storageService: StorageService, private router: Router, public dictionaryService: DictionaryService, 
    public listService: ListService, public errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {
    this.storageService.resetValues();
  }

  /**
   * Click on the "New customer" button triggers this method. The method navigates to the NewISOComponent. 
   */
  onNewCustomer(){
    this.storageService.debitCreditType = this.debitCreditType
    this.storageService.customerType = this.customerType
    this.router.navigate(['/iso']);
  }
}
