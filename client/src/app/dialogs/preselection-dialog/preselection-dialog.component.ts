import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-preselection-dialog',
  templateUrl: './preselection-dialog.component.html',
  styleUrls: ['./preselection-dialog.component.scss']
})
export class PreselectionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PreselectionDialogComponent>, public dictionaryService: DictionaryService) { }

  customerType = "person";
  debitCreditType = "debit";
  
  ngOnInit(): void {
  }

  changeCustomerType(event: any) {
    if (event.value === 'organization') {
      this.customerType = 'organization';
    } else {
      this.customerType = 'person';
    }
  }

  changeDebitCreditType(event: any) {
    if (event.value === 'credit') {
      this.debitCreditType = 'credit';
    } else {
      this.debitCreditType = 'debit';
    }
  }

  onYesClick() {
    this.dialogRef.close({customerType: this.customerType, debitCreditType: this.debitCreditType });
  }

}
