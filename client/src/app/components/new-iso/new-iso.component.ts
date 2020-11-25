import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
import { SendMaskConfirmationDialogComponent } from 'src/app/dialogs/send-direct-mask-dialog/send-direct-mask-dialog.component';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { HttpService } from 'src/app/services/http.service';
import { ListService } from 'src/app/services/list.service';
import { SOAPService } from 'src/app/services/soap.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-iso',
  templateUrl: './new-iso.component.html',
  styleUrls: ['./new-iso.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewISOComponent implements OnInit {

  preselection: FormGroup;
  contactInformation: FormGroup;
  applicant: FormGroup;
  payment: FormGroup;

  legalForms;
  titles;
  salutations;
  countries;
  paymentTerms;

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService, public listService: ListService, public storageService: StorageService, private toastr: ToastrService,
    private dialog: MatDialog, private httpService: HttpService, private soapService: SOAPService, public errorMessageService: ErrorMessageService, private router: Router) {
    this.titles = this.listService.titles;
    this.countries = this.listService.countries;
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    if (this.storageService.customerType === 'organization') {
      this.legalForms = this.listService.legalFormsOrganization;
      this.salutations = this.listService.salutationsOrganization;
      if (this.storageService.debitCreditType === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initOrganizationDebit()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initOrganizationCredit()
      }
    } else {
      this.legalForms = this.listService.legalFormsPerson;
      this.salutations = this.listService.salutationsPerson;
      if (this.storageService.debitCreditType === 'debit') {
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
      legalForm: ['', Validators.required],
      interfaceNumber: [''],
      salutation: ['', Validators.required],
      additionalName: [''],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
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
      industryFieldCode: ['', Validators.required],
      industryField: ['', Validators.required],
      iban: [''],
      bic: [''],
      bank: [''],
      paymentTerm: ['', Validators.required],
      notes: [''],
      sepa: [false],
    });
  }

  initPerson() {
    this.contactInformation.addControl('title', new FormControl(''));
    this.contactInformation.addControl('firstName', new FormControl('', Validators.required));
    this.contactInformation.addControl('secondName', new FormControl('', Validators.required));
    this.contactInformation.addControl('birthDate', new FormControl('', this.storageService.debitCreditType == 'debit' ? Validators.required : []));
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
    this.contactInformation.addControl('orgaPersons', new FormControl('', Validators.required));
  }

  initOrganizationDebit() {
    this.initSharedForm();
    this.initOrganization();
    this.applicant = this.formBuilder.group({
      salutation: ['', Validators.required],
      title: [''],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      birthDate: [''],
      phone: [''],
      mobile: [''],
      email: [''],

      salutation1: ['', Validators.required],
      title1: [''],
      firstName1: ['', Validators.required],
      secondName1: ['', Validators.required],
      birthDate1: ['', Validators.required],
      phone1: [''],
      mobile1: [''],
      email1: [''],

      salutation2: ['', Validators.required],
      title2: [''],
      firstName2: ['', Validators.required],
      secondName2: ['', Validators.required],
      birthDate2: ['', Validators.required],
      phone2: [''],
      mobile2: [''],
      email2: [''],
    });

    this.payment.addControl('agb', new FormControl(false));
    this.payment.addControl('creditLimit', new FormControl(''));
  }

  initOrganizationCredit() {
    this.initSharedForm();
    this.initOrganization();
  }

  openSendSOAPDialog() {
    const sendMaskDialogRef = this.dialog.open(SendMaskConfirmationDialogComponent, {
      disableClose: true,
      backdropClass: 'backdrop-background',
    });

    sendMaskDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.sendMask({ isDirect: true, name: "some name" }).subscribe(res => {
          console.log(res);
          this.toastr.success(this.dictionaryService.get('SNT'), this.dictionaryService.get('SUC'));
        });
      } else {
        const emailDialogRef = this.dialog.open(EmailDialogComponent, {
          disableClose: true,
          backdropClass: 'backdrop-background',
        });
        emailDialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result)
            this.httpService.sendMask({ isDirect: false, emailTo: result, name: "some name" }).subscribe(res => {
              console.log(res);
              this.toastr.success(this.dictionaryService.get('SNT'), this.dictionaryService.get('SUC'));
            });
          }
        });
      }
    });
  }

  setIbanBicRequired() {
    this.payment.get('iban').setValidators([Validators.required]);
    this.payment.get('bic').setValidators([Validators.required]);
  }

  unsetIbanBicRequired() {
    this.payment.get('iban').setValidators([]);
    this.payment.get('bic').setValidators([]);
  }

}