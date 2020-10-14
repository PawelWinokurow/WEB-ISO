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
    { name: 'eV Eingetr. Verein' },
    { name: 'Eingetragener Kfm.' },
    { name: 'GbR Ges. bürg. Rechts' },
    { name: 'Gewerbebetrieb' },
    { name: 'GFreier Beruf' },
    { name: 'Landwirt' },
    { name: 'Stiftung' },
    { name: 'Staatl. Einrichtung' },
    { name: 'Einzelunternehmer' },
  ];

  locations: { name: string }[] = [
    { name: 'Deutschland' },
  ];


  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.preselection = this.formBuilder.group({
      customerType: ['private', Validators.required],
      debCreType: ['debit', Validators.required]
    });
    this.initSharedForm();
  }

  changeCustomerType(event: any) {
    if (event.value === 'commercial') {
      this.preselection.get('customerType').setValue('commercial', Validators.required);
      this.initCommercialForm();
    } else {
      this.preselection.get('customerType').setValue('private', Validators.required);
      this.initPrivateForm();
    }
  }

  changeDebCreType(event: any) {
    if (event.value === 'credit') {
      this.preselection.get('debCreType').setValue('credit', Validators.required);
    } else {
      this.preselection.get('debCreType').setValue('debit', Validators.required);
    }
  }

  initSharedForm() {
    this.contactInformation = this.formBuilder.group({
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      fax: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }


  initCommercialForm() {
    this.initSharedForm();
    this.contactInformation.addControl('company', new FormControl('', Validators.required));
    this.contactInformation.addControl('additionalInformation', new FormControl(''));


    //Init form for credit and commercial
    if (this.preselection.get('debCreType').value === 'credit') {
      this.preselection.addControl('legalForm', new FormControl('', Validators.required));

    }
    //Init form for debit and commercial
    if (this.preselection.get('debCreType').value === 'debit') {

    }
  }

  initPrivateForm() {
    this.preselection.removeControl('legalForm');

    //Init form for credit and private
    if (this.preselection.get('debCreType').value === 'credit') {

    }
    //Init form for debit and private
    if (this.preselection.get('debCreType').value === 'debit') {

    }
  }
}
