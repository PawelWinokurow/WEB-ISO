const cryptoService = require('./crypto');
const databaseService = require('./database');
const customerService = require('./customer');


async function storeTestData() {
  await databaseService.connect()
  await databaseService.dropTables();
  await databaseService.createTables();

  let accounts = [
    {
      username: 'admin',
      email: 'pawelwinokurow@gmail.com',
      companyCode: '1100',
      password: cryptoService.hashPassword('admin'),
      blocked: false,
      role: 'ADMIN',
    },
    {
      username: 'user',
      email: 'user@user.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('user'),
      blocked: false,
      role: 'USER',
    },
    {
      username: 'user2',
      email: 'user2@user2.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('user2'),
      blocked: false,
      role: 'USER',
    },
    {
      username: 'user3',
      email: 'user3@user3.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('user3'),
      blocked: false,
      role: 'USER',
    },
  ];

  let reset = {
    hash: '100',
    email: 'user@user.de'
  }

  const customer = {
    data: {
      companyCode: '',
      legalForm: '01',
      interfaceNumber: 'interfaceNumber',
      salutation: '0003',
      additionalName: 'additionalName',
      street: 'street',
      houseNumber: 'houseNumber',
      zip: 'zip',
      city: 'city',
      country: 'AD',
      mailbox: 'mailbox',
      zipMailbox: 'zipMailbox',
      phone: 'phone',
      fax: 'fax',
      mobile: 'mobile',
      email: 'email',
      taxId: 'taxId',
      vatId: 'vatId',
      industryFieldCode: '0111',
      industryField: 'A1',
      iban: 'iban',
      bic: 'bic',
      bank: 'bank',
      paymentTerm: '0000',
      notes: 'notes',
      sepa: false,
      files: [],
      title: '',
      firstName: '',
      secondName: '',
      birthDate: '',
      agb: false,
      creditLimit: 'creditLimit',
      orgaPersons: 'orgaPersons',
      applicantSalutation0: '0003',
      applicantTitle0: '0002',
      applicantFirstName0: 'applicantFirstName0',
      applicantSecondName0: 'applicantSecondName0',
      applicantBirthDate0: '',
      applicantPhone0: 'applicantPhone0',
      applicantMobile0: 'applicantMobile0',
      applicantEmail0: 'applicantEmail0',
      applicantSalutation1: '',
      applicantTitle1: '',
      applicantFirstName1: '',
      applicantSecondName1: '',
      applicantBirthDate1: '',
      applicantPhone1: '',
      applicantMobile1: '',
      applicantEmail1: '',
      applicantSalutation2: '',
      applicantTitle2: '',
      applicantFirstName2: '',
      applicantSecondName2: '',
      applicantBirthDate2: '',
      applicantPhone2: '',
      applicantMobile2: '',
      applicantEmail2: ''
    },
    customerType: 'organization',
    debitCreditType: 'debit'
  }

  try {
    for (const accountToStore of accounts) {
      await databaseService.storeAccount(accountToStore)
    }
    await databaseService.storePasswordReset(reset.hash, reset.email)

    await databaseService.storeCustomer("hash_customer", "pawelwinokurow@gmail.com", customer)
    await databaseService.setCustomerSAPID("sap_ID", "hash_customer")
    await databaseService.storeCustomer("hash_customer2", "user@user.de", "customer_object2")
    await databaseService.setCustomerSAPID("sap_ID2", "hash_customer2")
  } catch (e) {
    console.error(e.stack);
  }

}

module.exports = {
  storeTestData,
};