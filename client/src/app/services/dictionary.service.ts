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

    ['PRS', 'Vorauswahl'],
    ['CUT', 'Kundentyp'],
    ['PRS', 'Person'],
    ['COM', 'Organisation'],
    ['DEB', 'Debitor'],
    ['KRE', 'Kreditor'],
    ['LEF', 'Rechtsform'],
    ['SSN', 'Schnittstellennummer'],

    ['CND', 'Kontaktdaten'],
    ['NIF', 'Namensangaben'],
    ['ADR', 'Anschrift'],
    ['CON', 'Kontakt'],
    ['ORG', 'Firma'],
    ['ANI', 'Zus. Namensangaben (c/o)'],
    ['BRT', 'Geburtsdatum'],
    ['STR', 'Straße'],
    ['HNU', 'Hausnr.'],
    ['MBX', 'Postfach'],
    ['MBP', 'Postfach Postleitzahl'],
    ['ZIP', 'Postleitzahl'],
    ['LOC', 'Ort'],
    ['COU', 'Land'],
    ['TEL', 'Telefon'],
    ['FAX', 'Telefax'],
    ['MOB', 'Mobiltelefon'],
    ['EMA', 'E-Mail'],

    ['PAY', 'Zahlung'],
    ['TAX', 'Steuernummer'],
    ['VAT', 'Umsatzsteuer-ID'],
    ['IFI', 'Branche'],
    ['IFC', 'Branchencode'],
    ['HSP', 'Lieferant hat SEPA-Lastschrift'],
    ['GSP', 'SEPA-Lastschrift erteilen'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BNK', 'Kreditinstitut'],
    ['TPA', 'Zahlungsbedingung'],
    ['CRL', 'Kreditlimit'],
    ['REF', 'Bemerkungsfeld'],

    ['EMP', 'Angestellter'],
    ['EMN', 'Angestellter Name'],
    ['EMC', 'Angestellter Kontakt'],
    ['TLE', 'Titel'],
    ['SAL', 'Anrede'],
    ['FNA', 'Vorname'],
    ['SNA', 'Nachname'],
    
    ['COM', 'Unternehmen'],
    ['DIS', 'Direkt senden'],
  ])

  dictionaryEN = new Map([
    ['YES', 'Yes'],
    ['NOO', 'No'],
    ['CAN', 'Cancel'],

    ['BCK', 'Back'],
    ['NXT', 'Next'],
    ['SND', 'Send'],

    ['PRS', 'Preselection'],
    ['CUT', 'Customer type'],
    ['PRS', 'Person'],
    ['COM', 'Organization'],
    ['DEB', 'Debtor'],
    ['KRE', 'Creditor'],
    ['LEF', 'Legal form'],
    
    ['SSN', 'Interface number'],

    ['CND', 'Contact'],
    ['NIF', 'Name'],
    ['ADR', 'Address'],
    ['CON', 'Contact'],
    ['ORG', 'Organisation'],
    ['ANI', 'Additional name'],
    ['BRT', 'Birth date'],
    ['STR', 'Street'],
    ['HNU', 'House no.'],
    ['MBX', 'Mailbox'],
    ['MBP', 'Mailbox ZIP'],
    ['ZIP', 'ZIP'],
    ['LOC', 'Location'],
    ['COU', 'Country'],
    ['TEL', 'Phone'],
    ['FAX', 'Fax'],
    ['MOB', 'Mobile phone'],
    ['EMA', 'E-Mail'],

    ['PAY', 'Payment'],
    ['TAX', 'Tax ID'],
    ['VAT', 'VAT ID'],
    ['IFI', 'Industry field'],
    ['IFC', 'Industry field code'],
    ['HSP', 'Supplier has SEPA direct debit'],
    ['GSP', 'Grant SEPA direct debit'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BNK', 'Credit institution'],
    ['CRL', 'Credit limit'],
    ['TPA', 'Terms of payment'],
    ['REF', 'Remarks field'],



    ['EMP', 'Employee'],
    ['EMN', 'Employee name'],
    ['EMC', 'Employee contact'],
    ['TLE', 'Title'],
    ['SAL', 'Salutation'],
    ['FNA', 'Name'],
    ['SNA', 'Surname'],

    ['COM', 'Organisation'],

    ['DIS', 'Send directly'],
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
