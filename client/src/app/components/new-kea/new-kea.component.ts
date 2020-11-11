import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
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
  payment: FormGroup;

  legalForms;
  titles;
  salutations;
  locations;
  paymentTerms;

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService, public listService: ListService,
    private dialog: MatDialog, private httpService: HttpService, private soapService: SOAPService) {
    this.legalForms = this.listService.legalFormsPerson;
    this.salutations = this.listService.salutationsPerson;
    this.paymentTerms = this.listService.paymentTermsDebit;
    this.titles = this.listService.titles;
    this.locations = this.listService.locations;
  }

  ngOnInit(): void {
    this.initPersonDebit();
    //this.soapService.sendSOAP("")
  }

  changeCustomerType(event: any) {
    if (event.value === 'organization') {
      this.preselection.get('customerType').setValue('organization');
    } else {
      this.preselection.get('customerType').setValue('person');
    }
    this.initForms();
  }

  changeDebCreType(event: any) {
    if (event.value === 'credit') {
      this.preselection.get('debCreType').setValue('credit');
    } else {
      this.preselection.get('debCreType').setValue('debit');
    }
    this.initForms();
  }

  initForms(){
    if (this.preselection.get('customerType').value === 'organization') {
      this.legalForms = this.listService.legalFormsOrganization;
      this.salutations = this.listService.salutationsOrganization;
      if (this.preselection.get('debCreType').value === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initOrganizationDebit()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initOrganizationCredit()
      }
    } else {
      this.legalForms = this.listService.legalFormsPerson;
      this.salutations = this.listService.salutationsPerson;
      if (this.preselection.get('debCreType').value === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initPersonDebit()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initPersonCredit()
      }
    }
  }

  initSharedForm() {
    this.preselection = this.formBuilder.group({
      customerType: ['person'],
      debCreType: ['debit']
    });
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
      mobilePhone: [''],
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
    this.contactInformation.addControl('salutationA', new FormControl(''));
    this.contactInformation.addControl('titleA', new FormControl(''));
    this.contactInformation.addControl('firstNameA', new FormControl(''));
    this.contactInformation.addControl('secondNameA', new FormControl(''));
    this.contactInformation.addControl('birthdayA', new FormControl(''));
    this.contactInformation.addControl('emailA', new FormControl(''));
    this.contactInformation.addControl('phoneA', new FormControl(''));
    this.contactInformation.addControl('mobilePhoneA', new FormControl(''));
    this.contactInformation.addControl('salutationA1', new FormControl(''));
    this.contactInformation.addControl('titleA1', new FormControl(''));
    this.contactInformation.addControl('firstNameA1', new FormControl(''));
    this.contactInformation.addControl('secondNameA1', new FormControl(''));
    this.contactInformation.addControl('birthdayA1', new FormControl(''));
    this.contactInformation.addControl('emailA1', new FormControl(''));
    this.contactInformation.addControl('phoneA1', new FormControl(''));
    this.contactInformation.addControl('mobilePhoneA1', new FormControl(''));
    this.contactInformation.addControl('salutationA2', new FormControl(''));
    this.contactInformation.addControl('titleA2', new FormControl(''));
    this.contactInformation.addControl('firstNameA2', new FormControl(''));
    this.contactInformation.addControl('secondNameA2', new FormControl(''));
    this.contactInformation.addControl('birthdayA2', new FormControl(''));
    this.contactInformation.addControl('emailA2', new FormControl(''));
    this.contactInformation.addControl('phoneA2', new FormControl(''));
    this.contactInformation.addControl('mobilePhoneA2', new FormControl(''));

    this.payment.addControl('agb', new FormControl(false));
    this.payment.addControl('creditLimit', new FormControl(false));
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
        const emailDialogRef = this.dialog.open(EmailDialogComponent, {

        });
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
