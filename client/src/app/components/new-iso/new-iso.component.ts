import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReplaySubject, Subject } from 'rxjs';
import { IndustryFieldCode } from 'src/app/interfaces/lists';
import { MatSelect } from '@angular/material/select';
import { pairwise, take, takeUntil } from 'rxjs/operators';
import { Mask } from 'src/app/interfaces/mask';


@Component({
  selector: 'app-new-iso',
  templateUrl: './new-iso.component.html',
  styleUrls: ['./new-iso.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewISOComponent implements OnInit, OnDestroy {

  contactInformation: FormGroup;
  applicant: FormGroup;
  payment: FormGroup;

  //Industry field free text search
  industryFieldCodesSearchCtrl: FormControl = new FormControl('');
  public filteredFieldCodes: ReplaySubject<IndustryFieldCode[]> = new ReplaySubject<IndustryFieldCode[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  legalForms;
  titles;
  salutations;
  countries;
  paymentTerms;
  industryFields;

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService, public listService: ListService, public storageService: StorageService, private toastr: ToastrService,
    private dialog: MatDialog, private httpService: HttpService, private soapService: SOAPService, public errorMessageService: ErrorMessageService, private router: Router) {
    this.titles = this.listService.titles;
    this.countries = this.listService.countries;
  }

  ngOnInit(): void {


    this.initForms();
    this.payment.get('industryField')
    .valueChanges.subscribe(() => {
        this.industryFields = this.listService.industryFieldCodes.get(this.payment.get('industryField').value.code);
        this.payment.get('industryFieldCode').enable();
        this.initIndustryCodeFilter();
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  initIndustryCodeFilter() {
    // set initial selection
    this.payment.get('industryFieldCode').setValue(this.industryFields[0]);

    // load the initial field list
    this.filteredFieldCodes.next(this.industryFields.slice());

    // listen for search field value changes
    this.industryFieldCodesSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterIndustryCodes();
      });
  }

  protected filterIndustryCodes() {
    if (!this.industryFields) {
      return;
    }
    // get the search keyword
    let search = this.industryFieldCodesSearchCtrl.value;
    if (!search) {
      this.filteredFieldCodes.next(this.industryFields.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the fields
    this.filteredFieldCodes.next(
      this.industryFields.filter(field => field.details.toLowerCase().indexOf(search) > -1)
    );
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
      email: ['', [Validators.email, Validators.required]],
      mailbox: [''],
      zipMailbox: [''],
    });

    this.payment = this.formBuilder.group({
      taxId: [''],
      vatId: [''],
      industryFieldCode: new FormControl({ value: "", disabled: true }, [Validators.required]),
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
      email: ['', Validators.email],

      salutation1: ['', Validators.required],
      title1: [''],
      firstName1: ['', Validators.required],
      secondName1: ['', Validators.required],
      birthDate1: ['', Validators.required],
      phone1: [''],
      mobile1: [''],
      email1: ['', Validators.email],

      salutation2: ['', Validators.required],
      title2: [''],
      firstName2: ['', Validators.required],
      secondName2: ['', Validators.required],
      birthDate2: ['', Validators.required],
      phone2: [''],
      mobile2: [''],
      email2: ['', Validators.email],
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
        const mask = this.constructMask(true)
        this.httpService.sendMask(mask).subscribe(res => {
          this.toastr.success(this.dictionaryService.get('SNT'), this.dictionaryService.get('SUC'));
        });
      } else {
        const emailDialogRef = this.dialog.open(EmailDialogComponent, {
          disableClose: true,
          backdropClass: 'backdrop-background',
        });
        emailDialogRef.afterClosed().subscribe(result => {
          if (result) {
            const mask = this.constructMask(false)
            this.httpService.sendMask(mask).subscribe(res => {
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

  formatDate(date) {
    var month = '' + (date.getMonth() + 1)
    var day = '' + date.getDate()
    var year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

  constructMask(isDirect: boolean) {
    const mask: Mask = {
      IV_PARTNERGROUP: "01",
      IV_PARTNERCATEGORY: this.storageService.debitCreditType === "person" ? "1" : "2",
      IS_CENTRALDATAPERSON: {
        FIRSTNAME: this.contactInformation.get("firstName").value,
        LASTNAME: this.contactInformation.get("secondName").value,
        TITLE_ACA1: this.contactInformation.get("title").value.name,
        BIRTHDATE: this.formatDate(new Date(this.contactInformation.get("birthDate").value)),
      },
      IS_ADDRESS: {
        C_O_NAME: this.contactInformation.get("additionalName").value,
        CITY: this.contactInformation.get("city").value,
        POSTL_COD1: this.contactInformation.get("zip").value,
        POSTL_COD2: this.contactInformation.get("zipMailbox").value,
        PO_BOX: this.contactInformation.get("mailbox").value,
        STREET: this.contactInformation.get("street").value,
        HOUSE_NO: this.contactInformation.get("houseNumber").value,
        COUNTRY: this.contactInformation.get("country").value.abbreviation,
      }

    };
    return {isDirect: isDirect, sapMask: mask}
  }

}