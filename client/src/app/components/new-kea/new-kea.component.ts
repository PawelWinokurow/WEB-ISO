import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
import { PreselectionDialogComponent } from 'src/app/dialogs/preselection-dialog/preselection-dialog.component';
import { SendMaskConfirmationDialogComponent } from 'src/app/dialogs/send-direct-mask-dialog/send-direct-mask-dialog.component';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { HttpService } from 'src/app/services/http.service';
import { ListService } from 'src/app/services/list.service';
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
  applicant: FormGroup;
  payment: FormGroup;
  
  show = false;

  legalForms;
  titles;
  salutations;
  locations;
  paymentTerms;
  customerType;
  debitCreditType

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService, public listService: ListService,
    private dialog: MatDialog, private httpService: HttpService, private soapService: SOAPService) {
    this.titles = this.listService.titles;
    this.locations = this.listService.locations;
  }

  ngOnInit(): void {
    this.initPersonDebit();
    this.openPreselectionDialog();
    //this.soapService.sendSOAP("")
  }

  openPreselectionDialog(){
    this.show = false;
    const preselectionDialogRef = this.dialog.open(PreselectionDialogComponent, { disableClose: true });
    preselectionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerType = result.customerType;
        this.debitCreditType = result.debitCreditType;
        this.initForms();
        this.show = true;
      }
    });
  }

  initForms() {
    if (this.customerType === 'organization') {
      this.legalForms = this.listService.legalFormsOrganization;
      this.salutations = this.listService.salutationsOrganization;
      if (this.debitCreditType === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initOrganizationDebit()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initOrganizationCredit()
      }
    } else {
      this.legalForms = this.listService.legalFormsPerson;
      this.salutations = this.listService.salutationsPerson;
      if (this.debitCreditType === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initPersonDebit()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initPersonCredit()
      }
    }
  }

  initSharedForm() {
    this.contactInformation = this.formBuilder.group({
      legalForm: [''],
      interfaceNumber: [''],
      salutation: [''],
      street: [''],
      houseNumber: [''],
      zip: [''],
      location: [''],
      country: [''],
      phone: [''],
      fax: [''],
      mobile: [''],
      email: [''],
      mailbox: [''],
      zipMailbox: [''],
    });

    this.payment = this.formBuilder.group({
      taxId: [''],
      vatId: [''],
      industryFieldCode: [''],
      industryField: [''],
      iban: [''],
      bic: [''],
      bank: [''],
      paymentTerm: [''],
      notes: [''],
      sepa: [false],
    });
  }

  initPerson() {
    this.contactInformation.addControl('title', new FormControl(''));
    this.contactInformation.addControl('firstName', new FormControl(''));
    this.contactInformation.addControl('secondName', new FormControl(''));
    this.contactInformation.addControl('additionalName', new FormControl(''));
    this.contactInformation.addControl('birthDate', new FormControl(''));
  }

  initPersonDebit() {
    this.initSharedForm();
    this.initPerson();

    this.payment.addControl('agb', new FormControl(false));
    this.payment.addControl('creditLimit', new FormControl(''));
  }

  initPersonCredit() {
    this.initSharedForm();
    this.initPerson();
  }

  initOrganization() {
    this.contactInformation.addControl('additionalName', new FormControl(''));
    this.contactInformation.addControl('orgaPersons', new FormControl(''));
  }

  initOrganizationDebit() {
    this.initSharedForm();
    this.initOrganization();
    this.applicant = this.formBuilder.group({
      salutation: [''],
      title: [''],
      firstName: [''],
      secondName: [''],
      birthDate: [''],
      phone: [''],
      mobile: [''],
      email: [''],

      salutation1: [''],
      title1: [''],
      firstName1: [''],
      secondName1: [''],
      birthDate1: [''],
      phone1: [''],
      mobile1: [''],
      email1: [''],

      salutation2: [''],
      title2: [''],
      firstName2: [''],
      secondName2: [''],
      birthDate2: [''],
      phone2: [''],
      mobile2: [''],
      email2: [''],
    });

    this.payment.addControl('agb', new FormControl(false));
    this.payment.addControl('creditLimit', new FormControl(''));
    this.payment.addControl('sepaRequest', new FormControl(false));
  }

  initOrganizationCredit() {
    this.initSharedForm();
    this.initOrganization();
    this.payment.addControl('hasSEPA', new FormControl(false));
  }

  openSendSOAPDialog() {
    const sendMaskDialogRef = this.dialog.open(SendMaskConfirmationDialogComponent, {
      width: '250px',
    });

    sendMaskDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.sendMask({ isDirect: true, name: "some name" }).subscribe(res => {
          console.log(res);
        });
      } else {
        const emailDialogRef = this.dialog.open(EmailDialogComponent);
        emailDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.httpService.sendMask({ isDirect: false, emailTo: result, name: "some name" }).subscribe(res => {
              console.log(res);
            });
          }
        });
      }
    });
  }
}
