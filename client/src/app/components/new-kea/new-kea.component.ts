import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SendMaskConfirmationDialogComponent } from 'src/app/dialogs/send-direct-mask/send-direct-mask.component';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { HttpService } from 'src/app/services/http.service';
import { SOAPService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-new-kea',
  templateUrl: './new-kea.component.html',
  styleUrls: ['./new-kea.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewKEAComponent implements OnInit {

  preselection: FormGroup;
  contactInformation: FormGroup;
  employee: FormGroup;
  company: FormGroup;

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

  titles: { name: string }[] = [
    { name: 'Dr.' },
    { name: 'Prof. Dr.' },
  ]

  salutations: { name: string }[] = [
    { name: 'Herr' },
    { name: 'Frau' },
  ]

  locations: { name: string }[] = [
    { name: 'Deutschland' },
  ];

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService,
    private dialog: MatDialog, private httpService: HttpService) { }

  ngOnInit(): void {
    this.preselection = this.formBuilder.group({
      customerType: ['private'],
      debCreType: ['debit']
    });
    this.initSharedForm();
  }

  changeCustomerType(event: any) {
    if (event.value === 'commercial') {
      this.preselection.get('customerType').setValue('commercial');
      this.initCommercialForm();
    } else {
      this.preselection.get('customerType').setValue('private');
      this.initPrivateForm();
    }
  }

  changeDebCreType(event: any) {
    if (event.value === 'credit') {
      this.preselection.get('debCreType').setValue('credit');
    } else {
      this.preselection.get('debCreType').setValue('debit');
    }
  }

  initSharedForm() {
    this.contactInformation = this.formBuilder.group({
      street: [''],
      houseNumber: [''],
      zipCode: [''],
      location: [''],
      country: [''],
      phone: [''],
      fax: [''],
      mobilePhone: [''],
      email: [''],
    });
    this.employee = this.formBuilder.group({
      title: [''],
      salutation: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      phone: [''],
      fax: [''],
      mobilePhone: [''],
      email: ['', Validators.required],
    });
    this.company = this.formBuilder.group({
      industryField: [''],
    });
  }

  initCommercialForm() {
    this.initSharedForm();
    this.preselection.addControl('legalForm', new FormControl(''));
    this.contactInformation.addControl('company', new FormControl(''));
    this.contactInformation.addControl('additionalInformation', new FormControl(''));

    //Init form for credit and commercial
    if (this.preselection.get('debCreType').value === 'credit') {

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


  openSendSOAPDialog() {
    const dialogRef = this.dialog.open(SendMaskConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let isDirect = false;
      if (result) {
        isDirect = true;
      } else {
        isDirect = false;
      }
      this.httpService.sendMask({ isDirect: isDirect, name: "some name" }).subscribe(res => {
        console.log(res);
      });
    });
  }
}
