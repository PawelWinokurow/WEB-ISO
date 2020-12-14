import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
import { SendMaskConfirmationDialogComponent } from 'src/app/dialogs/send-direct-mask-dialog/send-direct-mask-dialog.component';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { HttpService } from 'src/app/services/http.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { IndustryFieldCode } from 'src/app/interfaces/lists';
import { MatSelect } from '@angular/material/select';
import { pairwise, take, takeUntil } from 'rxjs/operators';
import { SahredMask } from 'src/app/interfaces/mask';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-new-iso',
  templateUrl: './new-iso.component.html',
  styleUrls: ['./new-iso.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewISOComponent implements OnInit, OnDestroy {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  contactInformation: FormGroup;
  applicant: FormGroup;
  payment: FormGroup;
  upload: FormGroup;

  //Industry field free text search
  industryFieldCodesSearchCtrl: FormControl = new FormControl('');
  countrySearchCtrl: FormControl = new FormControl('');
  public filteredFieldCodes: ReplaySubject<IndustryFieldCode[]> = new ReplaySubject<IndustryFieldCode[]>(1);
  public filteredCountries: ReplaySubject<IndustryFieldCode[]> = new ReplaySubject<IndustryFieldCode[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected onDestroyIndustryFieldCode = new Subject<void>();
  protected onDestroyCountry = new Subject<void>();

  legalForms;
  titles;
  salutations;
  countries;
  paymentTerms;
  industryFields;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService, public listService: ListService, public storageService: StorageService, private toastr: ToastrService,
    private dialog: MatDialog, private httpService: HttpService, public errorMessageService: ErrorMessageService, private searchService: SearchService) {
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
    this.initCountryFilter();
  }

  ngOnDestroy() {
    this.onDestroyIndustryFieldCode.next();
    this.onDestroyIndustryFieldCode.complete();
    this.onDestroyCountry.next();
    this.onDestroyCountry.complete();
  }

  initCountryFilter() {
    //this.contactInformation.get('country').setValue('');
    this.filteredCountries.next(this.countries.slice());
    this.countrySearchCtrl.valueChanges
      .pipe(takeUntil(this.onDestroyCountry))
      .subscribe(() => {
        this.searchService.filter(this.countrySearchCtrl, this.countries, this.filteredCountries);
      });
  }

  initIndustryCodeFilter() {
    //this.payment.get('industryFieldCode').setValue('');
    this.filteredFieldCodes.next(this.industryFields.slice());
    this.industryFieldCodesSearchCtrl.valueChanges
      .pipe(takeUntil(this.onDestroyIndustryFieldCode))
      .subscribe(() => {
        this.searchService.filter(this.industryFieldCodesSearchCtrl, this.industryFields, this.filteredFieldCodes);
      });
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
      email: ['', [Validators.email]],
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

    this.upload = this.formBuilder.group({
      files: [[]],
    });
  }

  initPerson() {
    this.contactInformation.addControl('title', new FormControl(''));
    this.contactInformation.addControl('firstName', new FormControl('', Validators.required));
    this.contactInformation.addControl('secondName', new FormControl('', Validators.required));
    this.contactInformation.addControl('birthDate', new FormControl(null, this.storageService.debitCreditType == 'debit' ? Validators.required : []));
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
        emailDialogRef.afterClosed().subscribe(emailTo => {
          if (emailTo) {
            var mask = this.constructMask(false)
            this.httpService.sendMask({ emailTo: emailTo, ...mask }).subscribe(res => {
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

    return [year, month, day].join('-');
  }

  constructMask(isDirect: boolean) {
    const mask: SahredMask = {
      IV_PARTNERGROUP: "01",
      IV_PARTNERCATEGORY: this.storageService.debitCreditType === "person" ? "1" : "2",
      IS_CENTRALDATAPERSON: {
        FIRSTNAME: this.contactInformation?.get("firstName")?.value ?? '',
        LASTNAME: this.contactInformation?.get("secondName")?.value ?? '',
        TITLE_ACA1: this.contactInformation?.get("title")?.value.code ?? '',
        BIRTHDATE: this.contactInformation?.get("birthDate")?.value == null ? '' :
          this.formatDate(new Date(this.contactInformation?.get("birthDate").value)),
      },
      IS_ADDRESS: {
        C_O_NAME: this.contactInformation?.get("additionalName")?.value ?? '',
        CITY: this.contactInformation?.get("city")?.value ?? '',
        POSTL_COD1: this.contactInformation?.get("zip")?.value ?? '',
        POSTL_COD2: this.contactInformation?.get("zipMailbox")?.value ?? '',
        PO_BOX: this.contactInformation?.get("mailbox")?.value ?? '',
        STREET: this.contactInformation?.get("street")?.value ?? '',
        HOUSE_NO: this.contactInformation?.get("houseNumber")?.value ?? '',
        COUNTRY: this.contactInformation?.get("country")?.value?.code ?? '',
      },
      IS_CENTRALDATAORGANIZATION: {
        LEGALFORM: this.contactInformation?.get('legalForm')?.value?.code ?? '',
      }

    };
    return { isDirect: isDirect, sapMask: mask }
  }

  uploadFile($event) {
    let files = this.upload.get('files').value;
    console.log(files)
    for (var file of $event.target.files) {
      files.push(file);
    }
    this.fileInput.nativeElement.value = "";
    this.upload.get('files').setValue(files);
  }

  removeFile(file): void {
    let files = this.upload.get('files').value;
    const index = files.indexOf(file);
    if (index >= 0) {
      files.splice(index, 1);
    }
    this.upload.get('files').setValue(files);
  }

}