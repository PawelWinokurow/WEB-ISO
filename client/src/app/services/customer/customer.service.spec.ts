import { TestBed } from '@angular/core/testing';
import { services, externalModules } from '../../modules/modules';
import { AuthService } from '../auth/auth.service';
import { CustomerService } from '../customer/customer.service';


describe('CustomerService', () => {
  let customerService: CustomerService;
  let authService: AuthService;


  let personDebitor = {
    data: {
      companyCode: 1100,

      //General information
      legalForm: '16', //Landwirt
      interfaceNumber: '9999',
      salutation: '0002', //Herr
      additionalName: 'Landwirt',

      //Address information
      street: 'Marzlinger Strasse',
      houseNumber: '55',
      city: 'Dachau',
      country: 'DE',
      zip: '85356',
      mailbox: '73512',
      zipMailbox: '97514',
      phone: '089 1111-2222',
      fax: '089 1111-2223',
      mobile: '0151 1111-2224',
      email: 'info@gmx.de',

      //Payment
      taxId: '12115142566',
      vatId: 'DE202954574',
      industryFieldCode: 'T1', //private Haushalte
      industryField: '9700', //Private Haushalte mit Hauspersonal
      iban: 'DE07100900008522805000',
      paymentTerm: '0000', //B000/000/000 fällig sofort netto
      notes: 'Hallo Zusammen',

      //Person forms
      title: '0001', //Dr.
      firstName: 'Franz',
      secondName: 'Meyer',
      birthDate: '1966-12-24',

    },
    customerType: 'person',
    debitCreditType: 'debitor'
  };

  let personCreditor = {
    data: {
      companyCode: 1100,

      //Shared forms

      //General information
      legalForm: '16', //Landwirt
      interfaceNumber: '9999',
      salutation: '0002', //Herr
      additionalName: 'Nagelstudio',

      //Address information
      street: 'Marzlinger Strasse',
      houseNumber: '55',
      city: 'Dachau',
      country: 'DE',
      zip: '85356',
      mailbox: '73512',
      zipMailbox: '97514',
      phone: '089 1111-2222',
      fax: '089 1111-2223',
      mobile: '0151 1111-2224',
      email: 'info@gmx.de',

      //Payment
      taxId: '12115142566',
      vatId: 'DE202954574',
      industryFieldCode: 'T1', //private Haushalte
      industryField: '9700', //Private Haushalte mit Hauspersonal
      iban: 'DE07100900008522805000',
      paymentTerm: '0000', //B000/000/000 fällig sofort netto
      notes: 'Hallo Kreditor *SEPA-Mandat*', //SEPA button yes

      //Person forms
      title: '0005', //MBA.
      firstName: 'Franz',
      secondName: 'Meyer',
      birthDate: '1966-12-24',
    },
    customerType: 'person',
    debitCreditType: 'creditor'
  };

  let organizationDebitor = {
    data: {
      companyCode: 1100,

      //General information
      legalForm: '02', //GmbH
      interfaceNumber: '2012',
      salutation: '0003', //Firma
      orgaPersons: 'Schneider',
      additionalName: 'Martin',

      //Address information
      street: 'Hauser Strasse',
      houseNumber: '7',
      city: 'München',
      country: 'DE',
      zip: '80331',
      mailbox: '271511',
      zipMailbox: '85417',
      phone: '089 1111-2222',
      fax: '089 1111-2223',
      mobile: '0151 1111-2224',
      email: 'info@gmx.de',

      //Payment
      taxId: '12115142566',
      vatId: 'DE202954574',
      industryFieldCode: 'A3', //Tierhaltung
      industryField: '0141', //Haltung von Milchkühen
      iban: 'DE07100900008522805000',
      paymentTerm: '0000', //B000/000/000 fällig sofort netto
      notes: 'Bitte um Rückruf nach Anlage *SEPA-Mandat*',
    },
    customerType: 'organization',
    debitCreditType: 'debitor'
  };

  let organizationCreditor = {
    data: {
      companyCode: 1100,

      //Shared forms

      //General information
      legalForm: '02', //GmbH
      interfaceNumber: '5012',
      salutation: '0003', //Firma
      orgaPersons: 'Hurry',
      additionalName: 'Peter',

      //Address information
      street: 'Hauser Strasse',
      houseNumber: '7',
      city: 'Augsburg',
      country: 'DE',
      zip: '80331',
      mailbox: '271511',
      zipMailbox: '85417',
      phone: '089 1111-2222',
      fax: '089 1111-2223',
      mobile: '0151 1111-2224',
      email: 'info@gmx.de',

      //Payment
      taxId: '12115142566',
      vatId: 'DE202954574',
      industryFieldCode: 'A3', //Tierhaltung
      industryField: '0141', //Haltung von Milchkühen
      iban: 'DE07100900008522805000',
      paymentTerm: '0000', //B000/000/000 fällig sofort netto
      notes: 'Bitte um Prüfung XXXX *SEPA-Mandat*',
    },
    customerType: 'organization',
    debitCreditType: 'creditor'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...services
      ],
      imports: [
        ...externalModules,
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    await authService.login('admin', 'admin');
    customerService = TestBed.inject(CustomerService);
  });

  it('sendPersonDebitor', async () => {
    await customerService.sendCustomer(personDebitor).toPromise()
    expect(true).toBeTrue();
  });

  it('sendPersonCreditor', async () => {
    await customerService.sendCustomer(personCreditor).toPromise()
    expect(true).toBeTrue();
  });

  it('sendOrganizationDebitor', async () => {
    await customerService.sendCustomer(organizationDebitor).toPromise()
    expect(true).toBeTrue();
  });

  it('sendOrganizationCreditor', async () => {
    await customerService.sendCustomer(organizationCreditor).toPromise()
    expect(true).toBeTrue();
  });


});
