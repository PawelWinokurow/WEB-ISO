const cryptoService = require('./crypto');
const databaseService = require('./database');


async function storeTestData() {
  await databaseService.connect()
  await databaseService.dropTables();
  await databaseService.createTables();

  let accounts = [
    {
      username: 'admin',
      email: 'pawelwinokurow@gmail.com',
      companyCode: '1100',
      salutationCode: '0002',
      firstName: 'VornameAdmin',
      secondName: 'NachnameAdmin',
      phone: 'Telefonnummer_admin',
      mobile: 'Mobiltelefonnummer_admin',
      password: cryptoService.hashPassword('admin'),
      blocked: false,
      role: 'ADMIN',
    },
    {
      username: 'winokurowp',
      email: 'paulweinmacher@gmail.com',
      companyCode: '1100',
      salutationCode: '0002',
      firstName: 'VornameAdmin',
      secondName: 'NachnameAdmin',
      phone: 'Telefonnummer_admin',
      mobile: 'Mobiltelefonnummer_admin',
      password: cryptoService.hashPassword('admin'),
      blocked: false,
      role: 'ADMIN',
    },
   
  ];

  let reset = {
    hash: '100',
    email: 'userA@userA.de'
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
    debitCreditType: 'debitor'
  }

  try {
    for (const accountToStore of accounts) {
      await databaseService.storeAccount(accountToStore)
    }
    await databaseService.storeCustomer("hash_customer", "pawelwinokurow@gmail.com", customer, true)
    //await databaseService.storePasswordReset(reset.hash, reset.email)
    //await databaseService.setCustomerSAPID("sap_ID", "hash_customer")
    //await databaseService.storeCustomer("hash_customer2", "userA@userA.de", "customer_object2", true)
    //await databaseService.setCustomerSAPID("sap_ID2", "hash_customer2")
  } catch (e) {
    console.error(e.stack);
  }
}

module.exports = {
  storeTestData,
};