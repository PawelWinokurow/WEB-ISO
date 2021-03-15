import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { IndustryFieldCode } from 'src/app/interfaces/lists';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { SendCustomerConfirmationDialog } from 'src/app/dialogs/send-customer-confirmation-dialog/send-customer-confirmation.dialog';
import { DateService } from 'src/app/services/date.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';


/**
 * Contains customer creation stepper. 
 * The stepper consists of steps, which contain forms required for customer creation. 
 * There are 4 different settings of steps: Debitor-Person, Debitor-Organization, Creditor-Person, Creditor-Organization.
 * Which one is currently showed depends on the choice in the preselection. 
 */
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

  industryFieldCodesSearchCtrl: FormControl = new FormControl('');
  countrySearchCtrl: FormControl = new FormControl('');
  public filteredFieldCodes: ReplaySubject<IndustryFieldCode[]> = new ReplaySubject<IndustryFieldCode[]>(1);
  public filteredCountries: ReplaySubject<IndustryFieldCode[]> = new ReplaySubject<IndustryFieldCode[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  onDestroyIndustryFieldCode = new Subject<void>();
  onDestroyCountry = new Subject<void>();

  legalForms;
  titles;
  salutations;
  countries;
  paymentTerms;
  industryFields;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder, public dictionaryService: DictionaryService, public listService: ListService, 
    public storageService: StorageService, private toastrService: ToastrService, private dialog: MatDialog, private customerService: CustomerService, 
    public errorMessageService: ErrorMessageService, private searchService: SearchService, private dateService: DateService,
    public authService: AuthService) {
    this.titles = this.listService.titles;
    this.countries = this.listService.countries;
  }

  ngOnInit(): void {
    //Initializes forms for selected types
    this.initForms();
    //Enable 'industryFieldCode' field, if industry field is selected
    this.payment.get('industryField')
      .valueChanges.subscribe(() => {
        this.industryFields = this.listService.industryFieldCodes.get(this.payment.get('industryField').value.code);
        this.payment.get('industryFieldCode').enable();
        this.initIndustryCodeFilter();
      });
    this.initCountryFilter();
  }


  /**
   * Called on destroy of the component.
   */
  ngOnDestroy() {
    this.onDestroyIndustryFieldCode.next();
    this.onDestroyIndustryFieldCode.complete();
    this.onDestroyCountry.next();
    this.onDestroyCountry.complete();
  }

  /**
   * Initializes country filter, required for the country free text search.
   */
  initCountryFilter() {
    this.filteredCountries.next(this.countries.slice());
    this.countrySearchCtrl.valueChanges
      .pipe(takeUntil(this.onDestroyCountry))
      .subscribe(() => {
        this.searchService.filter(this.countrySearchCtrl, this.countries, this.filteredCountries);
      });
  }

  /**
   * Initializes industry code filter, required for the country free text search.
   */
  initIndustryCodeFilter() {
    this.filteredFieldCodes.next(this.industryFields.slice());
    this.industryFieldCodesSearchCtrl.valueChanges
      .pipe(takeUntil(this.onDestroyIndustryFieldCode))
      .subscribe(() => {
        this.searchService.filter(this.industryFieldCodesSearchCtrl, this.industryFields, this.filteredFieldCodes);
      });
  }

  /**
   * Initializes forms according customer and debit/credit type.
   */
  initForms() {
    if (this.storageService.customerType === 'organization') {
      this.legalForms = this.listService.legalFormsOrganization;
      this.salutations = this.listService.salutationsOrganization;
      if (this.storageService.debitCreditType === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initOrganizationDebitForms()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initOrganizationCreditForms()
      }
    } else {
      this.legalForms = this.listService.legalFormsPerson;
      this.salutations = this.listService.salutationsPerson;
      if (this.storageService.debitCreditType === 'debit') {
        this.paymentTerms = this.listService.paymentTermsDebit;
        this.initPersonDebitForms()
      } else {
        this.paymentTerms = this.listService.paymentTermsCredit;
        this.initPersonCreditForms()
      }
    }
  }

  /**
   * Initializes forms shared by all stepper settings.
   */
  initSharedForms() {
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

  /**
   * Initializes FormControls for person type.
   */
  initPersonForms() {
    this.contactInformation.addControl('title', new FormControl(''));
    this.contactInformation.addControl('firstName', new FormControl('', Validators.required));
    this.contactInformation.addControl('secondName', new FormControl('', Validators.required));
    this.contactInformation.addControl('birthDate', new FormControl(null, this.storageService.debitCreditType == 'debit' ? Validators.required : []));
  }

  /**
   * Initializes FormControls for person and debit type.
   */
  initPersonDebitForms() {
    this.initSharedForms();
    this.initPersonForms();

    this.payment.addControl('agb', new FormControl(false));
    this.payment.addControl('creditLimit', new FormControl(''));
  }

  /**
   * Initializes FormControls for person and credit type.
   */
  initPersonCreditForms() {
    this.initSharedForms();
    this.initPersonForms();
  }

  /**
   * Initializes FormControls for organization type.
   */
  initOrganizationForms() {
    this.contactInformation.addControl('orgaPersons', new FormControl('', Validators.required));
  }

  /**
   * Initializes FormControls for organization and debit type.
   */
  initOrganizationDebitForms() {
    this.initSharedForms();
    this.initOrganizationForms();
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

  /**
   * Initializes FormControls for organization and credit type.
   */
  initOrganizationCreditForms() {
    this.initSharedForms();
    this.initOrganizationForms();
  }

  /**
   * Opens send customer dialog.
   */
  openSendSOAPDialog() {
    /*const customer = this.constructCustomer(true)
    this.customerService.sendCustomer(customer).subscribe(res => {
      this.toastrService.success(this.dictionaryService.get('CUSISSND'), this.dictionaryService.get('SUC'));
    });
    return*/
    const sendCustomerDialogRef = this.dialog.open(SendCustomerConfirmationDialog, {
      //disableClose: true,
      //backdropClass: 'backdrop-background',
    });

    sendCustomerDialogRef.afterClosed().subscribe(isDirect => {
      const customer = this.constructCustomer(isDirect);
      if (isDirect == true) {
        this.customerService.sendCustomer(customer).subscribe(res => {
          this.toastrService.success(this.dictionaryService.get('CUSISSND'), this.dictionaryService.get('SUC'));
        });
      } else if (isDirect == false) {
        this.customerService.sendCustomer({ emailTo: this.authService.getUser().email, ...customer }).subscribe(res => {
          this.toastrService.success(this.dictionaryService.get('CONFISSND'), this.dictionaryService.get('SUC'));
        });
      }
    });
  }

  /**
   * Sets IBAN and BIC required validator.
   */
  setIbanBicRequired() {
    this.payment.get('iban').setValidators([Validators.required]);
    this.payment.get('bic').setValidators([Validators.required]);
  }

  /**
   * Unsets IBAN and BIC required validator.
   */
  unsetIbanBicRequired() {
    this.payment.get('iban').setValidators([]);
    this.payment.get('bic').setValidators([]);
  }

  /**
   * Constructs customer from ControlForms.
   * @param isDirect Send customer directly to SAP or with confirmation email.
   * @returns Customer object to send.
   */
  constructCustomer(isDirect: boolean) {
    const data = {
      //Preselection
      companyCode: this.authService.getUser().companyCode?.code ?? '',

      //Shared forms

      //Contact information
      legalForm: this.contactInformation?.get('legalForm')?.value?.code ?? '',
      interfaceNumber: this.contactInformation?.get('interfaceNumber')?.value ?? '',
      salutation: this.contactInformation?.get('salutation')?.value?.code ?? '',
      additionalName: this.contactInformation?.get("additionalName")?.value ?? '',
      city: this.contactInformation?.get("city")?.value ?? '',
      zip: this.contactInformation?.get("zip")?.value ?? '',
      zipMailbox: this.contactInformation?.get("zipMailbox")?.value ?? '',
      mailbox: this.contactInformation?.get("mailbox")?.value ?? '',
      street: this.contactInformation?.get("street")?.value ?? '',
      houseNumber: this.contactInformation?.get("houseNumber")?.value ?? '',
      country: this.contactInformation?.get("country")?.value?.code ?? '',
      phone: this.contactInformation?.get("phone")?.value ?? '',
      fax: this.contactInformation?.get("fax")?.value ?? '',
      mobile: this.contactInformation?.get("mobile")?.value ?? '',
      email: this.contactInformation?.get("email")?.value ?? '',

      //Payment
      taxId: this.payment?.get("taxId")?.value ?? '',
      vatId: this.payment?.get("vatId")?.value ?? '',
      industryFieldCode: this.payment?.get("industryFieldCode")?.value?.code ?? '',
      industryField: this.payment?.get("industryField")?.value?.code ?? '',
      iban: this.payment?.get("iban")?.value ?? '',
      bic: this.payment?.get("bic")?.value ?? '',
      bank: this.payment?.get("bank")?.value ?? '',
      paymentTerm: this.payment?.get("paymentTerm")?.value?.code ?? '',
      notes: this.payment?.get("notes")?.value ?? '',
      sepa: this.payment?.get("sepa")?.value ?? '',
      //Uploaded files
      files: this.upload?.get("files")?.value ?? '',

      //Person forms
      title: this.contactInformation?.get('title')?.value?.code ?? '',
      firstName: this.contactInformation?.get('firstName')?.value ?? '',
      secondName: this.contactInformation?.get('secondName')?.value ?? '',
      birthDate: this.contactInformation?.get("birthDate")?.value == null ? '' :
        this.dateService.formatDate(new Date(this.contactInformation?.get("birthDate").value)),

      //Person debit forms
      agb: this.payment?.get('agb')?.value ?? '',
      creditLimit: this.payment?.get('creditLimit')?.value ?? '',

      //Organization forms
      orgaPersons: this.contactInformation?.get('orgaPersons')?.value ?? '',

      //Organization debit forms

      //Applicant 0
      applicantSalutation0: this.applicant?.get('salutation')?.value?.code ?? '',
      applicantTitle0: this.applicant?.get('title')?.value?.code ?? '',
      applicantFirstName0: this.applicant?.get('firstName')?.value ?? '',
      applicantSecondName0: this.applicant?.get('secondName')?.value ?? '',
      applicantBirthDate0: this.applicant?.get('birthDate')?.value == null ? '' :
        this.dateService.formatDate(new Date(this.applicant?.get("birthDate").value)),
      applicantPhone0: this.applicant?.get('phone')?.value ?? '',
      applicantMobile0: this.applicant?.get('mobile')?.value ?? '',
      applicantEmail0: this.applicant?.get('email')?.value ?? '',

      //Applicant 1
      applicantSalutation1: this.applicant?.get('salutation1')?.value?.code ?? '',
      applicantTitle1: this.applicant?.get('title1')?.value?.code ?? '',
      applicantFirstName1: this.applicant?.get('firstName1')?.value ?? '',
      applicantSecondName1: this.applicant?.get('secondName1')?.value ?? '',
      applicantBirthDate1: this.applicant?.get('birthDate1')?.value == null ? '' :
        this.dateService.formatDate(new Date(this.applicant?.get("birthDate1").value)),
      applicantPhone1: this.applicant?.get('phone1')?.value ?? '',
      applicantMobile1: this.applicant?.get('mobile1')?.value ?? '',
      applicantEmail1: this.applicant?.get('email1')?.value ?? '',

      //Applicant 2
      applicantSalutation2: this.applicant?.get('salutation2')?.value?.code ?? '',
      applicantTitle2: this.applicant?.get('title2')?.value?.code ?? '',
      applicantFirstName2: this.applicant?.get('firstName2')?.value ?? '',
      applicantSecondName2: this.applicant?.get('secondName2')?.value ?? '',
      applicantBirthDate2: this.applicant?.get('birthDate2')?.value == null ? '' :
        this.dateService.formatDate(new Date(this.applicant?.get("birthDate2").value)),
      applicantPhone2: this.applicant?.get('phone2')?.value ?? '',
      applicantMobile2: this.applicant?.get('mobile2')?.value ?? '',
      applicantEmail2: this.applicant?.get('email2')?.value ?? '',

    };
    return {
      isDirect: isDirect, customerType: this.storageService.customerType,
      debitCreditType: this.storageService.debitCreditType, data: data
    }
  }

  /**
   * Click on the "add file" button triggers this method. 
   * The method allows to choose files to upload. 
   * @param $event Input event
   */
  uploadFile($event) {
    let files = this.upload.get('files').value;
    for (var file of $event.target.files) {
      files.push(file);
    }
    this.fileInput.nativeElement.value = "";
    this.upload.get('files').setValue(files);
  }

  /**
   * Remove uploaded file.
   * @param file Uploaded file
   */
  removeFile(file): void {
    let files = this.upload.get('files').value;
    const index = files.indexOf(file);
    if (index >= 0) {
      files.splice(index, 1);
    }
    this.upload.get('files').setValue(files);
  }

}