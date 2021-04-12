import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import { StorageService } from 'src/app/services/storage.service';
import { ReplaySubject, Subject } from 'rxjs';
import { IndustryFieldCode } from 'src/app/interfaces/lists';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { SendCustomerConfirmationDialog } from 'src/app/dialogs/send-customer-confirmation-dialog/send-customer-confirmation.dialog';
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

  generalInformation: FormGroup;
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
    public storageService: StorageService, private dialog: MatDialog, private customerService: CustomerService,
    public errorMessageService: ErrorMessageService, private searchService: SearchService, public authService: AuthService) {
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
    this.generalInformation = this.formBuilder.group({
      legalForm: ['', Validators.required],
      interfaceNumber: [''],
      salutation: ['', Validators.required],
      additionalName: [''],
    });

    this.contactInformation = this.formBuilder.group({
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      mailbox: [''],
      zipMailbox: [''],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: [''],
      fax: [''],
      mobile: [''],
      email: ['', [Validators.email]],
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
    this.generalInformation.addControl('title', new FormControl(''));
    this.generalInformation.addControl('firstName', new FormControl('', Validators.required));
    this.generalInformation.addControl('secondName', new FormControl('', Validators.required));
    this.generalInformation.addControl('birthDate', new FormControl(null, this.storageService.debitCreditType == 'debit' ? Validators.required : []));
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
    this.generalInformation.addControl('orgaPersons', new FormControl('', Validators.required));
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
  async openSendSOAPDialog() {
    /*const customer= {
      data: this.customerService.constructObject(this.generalInformation, 
        this.contactInformation, this.payment, this.applicant, this.upload), 
        customerType: this.storageService.customerType,
      debitCreditType: this.storageService.debitCreditType
    };
    await this.customerService.sendCustomer(customer).toPromise();
    return*/
    const sendCustomerDialogRef = this.dialog.open(SendCustomerConfirmationDialog);
    const isDirect = await sendCustomerDialogRef.afterClosed().toPromise();
    const customer = {
      data: this.customerService.constructObject(this.generalInformation,
        this.contactInformation, this.payment, this.applicant, this.upload),
      customerType: this.storageService.customerType,
      debitCreditType: this.storageService.debitCreditType
    };
    if (isDirect === true) {
      await this.customerService.sendCustomer(customer).toPromise();
    } else if (isDirect === false) {
      await this.customerService.sendCustomerRequest(customer).toPromise();
    }
    //this.router.navigate(['/preselection']);
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