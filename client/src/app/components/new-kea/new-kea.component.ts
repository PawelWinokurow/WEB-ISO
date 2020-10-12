import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-new-kea',
  templateUrl: './new-kea.component.html',
  styleUrls: ['./new-kea.component.scss']
})
export class NewKEAComponent implements OnInit {

  preselection: FormGroup;
  contactInformation: FormGroup;

  legalForms: { name: string }[] = [
    { name: 'AG' },
    { name: 'GmbH' },
    { name: 'S.E.' },
    { name: 'GmbH&Co.KG' },
    { name: 'KGAA' },
    { name: 'KG' },
    { name: 'OHG' },
    { name: 'UG' },
    { name: 'eG E. Genossenschaft' },
    { name: 'eV Eigetr. Verein' },
    { name: 'Stiftung' },
    { name: 'Staatl. Einrichtung' },
  ];

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.preselection = this.formBuilder.group({
      customerType: ['private', Validators.required],
      debCreType: ['debit', Validators.required]
    });
    this.contactInformation = this.formBuilder.group({
      company: ['', Validators.required],
      additionalInformation: [''],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  changeCustomerType(event: any) {
    if (event.value === 'commercial') {
      this.preselection.get('customerType').setValue('commercial', Validators.required);
      this.preselection.addControl('legalForm', new FormControl('', Validators.required));
    } else {
      this.preselection.get('customerType').setValue('private', Validators.required);
      this.preselection.removeControl('legalForm');
    }
  }

  changeDebCreType(event: any) {
    if (event.value === 'credit') {
      this.preselection.get('debCreType').setValue('credit', Validators.required);
    } else {
      this.preselection.get('debCreType').setValue('debit', Validators.required);
    }
  }
}
