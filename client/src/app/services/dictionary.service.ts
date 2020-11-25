import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  currentLanguage: string = 'DE';

  languages = new Map([
    ['DE', 'Deutsch'],
    ['EN', 'English'],
  ]);

  dictionaryDE = new Map([
    ['YES', 'Ja'],
    ['NOO', 'Nein'],
    ['CAN', 'Abbrechen'],
    
    ['BCK', 'Zurück'],
    ['NXT', 'Weiter'],
    ['SND', 'Senden'],

    ['MGE', 'Maske generieren'],

    ['PRS', 'Vorauswahl'],
    ['CUT', 'Kundentyp'],
    ['PER', 'Person'],
    ['ORG', 'Organisation'],
    ['DEB', 'Debitor'],
    ['CRE', 'Kreditor'],
    ['LEF', 'Rechtsform'],
    ['SSN', 'Schnittstellennummer'],

    ['CND', 'Kontaktdaten'],
    ['GEI', 'Allgemeine Informationen'],
    ['ADI', 'Adressinformationen'],
    ['PAI', 'Zahlungsinformationen'],

    ['NIF', 'Namensangaben'],
    ['ADR', 'Anschrift'],
    ['CON', 'Kontakt'],
    ['ANI', 'Zus. Namensangaben (c/o)'],
    ['BRT', 'Geburtsdatum'],
    ['STR', 'Straße'],
    ['HNU', 'Hnr.'],
    ['MBX', 'Postfach'],
    ['MBP', 'Postfach PLZ'],
    ['ZIP', 'PLZ'],
    ['CIT', 'Ort'],
    ['COU', 'Land'],
    ['TEL', 'Telefon'],
    ['FAX', 'Telefax'],
    ['MOB', 'Mobiltelefon'],
    ['EMA', 'E-Mail-Adresse'],

    ['PAY', 'Zahlung'],
    ['TAX', 'Steuernummer'],
    ['VAT', 'Umsatzsteuer-ID'],
    ['IFI', 'Branche'],
    ['IFC', 'Branchencode'],
    ['HSP', 'Lieferant hat SEPA-Lastschrift'],
    ['GSP', 'SEPA-Lastschrift erteilen'],
    ['RSP', 'SEPA-Lastschrift anfordern'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BNK', 'Kreditinstitut'],
    ['TPA', 'Zahlungsbedingung'],
    ['CRL', 'Kreditlimit'],
    ['REF', 'Bemerkungsfeld'],

    ['APP', 'Antragsteller'],
    ['AP1', '1. Antragsteller'],
    ['AP2', '2. Antragsteller'],
   
    ['TLE', 'Titel'],
    ['SAL', 'Anrede'],
    ['COP', 'Firma / Personen'],

    ['FNA', 'Vorname'],
    ['SNA', 'Nachname'],
    
    ['EEM', 'Bitte geben Sie Ihre E-Mail-Adresse ein.'],
    ['SUB', 'Einreichen'],
    ['DIS', 'Maske direkt senden?'],

    ['SNT', 'Die Maske wurde gesendet.'],
    ['SUC', 'Erfolg!'],
  ])

  dictionaryEN = new Map([
    ['YES', 'Yes'],
    ['NOO', 'No'],
    ['CAN', 'Cancel'],

    ['BCK', 'Back'],
    ['NXT', 'Next'],
    ['SND', 'Send'],

    ['MGE', 'Generate mask'],

    ['PRS', 'Preselection'],
    ['CUT', 'Customer type'],
    ['PER', 'Person'],
    ['DEB', 'Debitor'],
    ['CRE', 'Creditor'],
    ['LEF', 'Legal form'],
    
    ['SSN', 'Interface number'],

    ['CND', 'Contact'],
    ['GEI', 'General information'],
    ['ADI', 'Address information'],
    ['PAI', 'Payment information'],

    ['NIF', 'Name'],
    ['ADR', 'Address'],
    ['CON', 'Contact'],
    ['ORG', 'Organization'],
    ['ANI', 'Additional name'],
    ['BRT', 'Birth date'],
    ['STR', 'Street'],
    ['HNU', 'House no.'],
    ['MBX', 'Mailbox'],
    ['MBP', 'Mailbox ZIP'],
    ['ZIP', 'ZIP'],
    ['CIT', 'City'],
    ['COU', 'Country'],
    ['TEL', 'Phone'],
    ['FAX', 'Fax'],
    ['MOB', 'Mobile phone'],
    ['EMA', 'Email address'],

    ['PAY', 'Payment'],
    ['TAX', 'Tax ID'],
    ['VAT', 'VAT ID'],
    ['IFI', 'Industry field'],
    ['IFC', 'Industry field code'],
    ['HSP', 'Supplier has SEPA direct debit'],
    ['GSP', 'Grant SEPA direct debit'],
    ['RSP', 'Request SEPA direct debit'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BNK', 'Credit institution'],
    ['CRL', 'Credit limit'],
    ['TPA', 'Terms of payment'],
    ['REF', 'Remarks field'],

    ['APP', 'Applicant'],
    ['AP1', 'Applicant 1'],
    ['AP2', 'Applicant 2'],

    ['TLE', 'Title'],
    ['SAL', 'Salutation'],
    ['COP', 'Company / Persons'],
    ['FNA', 'Name'],
    ['SNA', 'Surname'],
    
    ['EEM', 'Please enter your email address.'],
    ['SUB', 'Submit'],
    ['DIS', 'Send mask directly?'],

    ['SNT', 'The mask was sent.'],
    ['SUC', 'Success!'],
  ])

  dictionary = new Map([
    ['DE', this.dictionaryDE],
    ['EN', this.dictionaryEN]
  ])



  constructor() { }

  switchLanguage() {
    this.currentLanguage = (this.currentLanguage == 'DE' ? 'EN' : 'DE')
  }

  get(abbreviation: string) {
    return this.dictionary.get(this.currentLanguage).get(abbreviation);
  }
}
