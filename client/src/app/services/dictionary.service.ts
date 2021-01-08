import { Injectable } from '@angular/core';

/**
 * Defines a map of labels and texts used in HTML.
 * There are two versions of mappings: one for English and one for German.
 */
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
    ['ATB', 'Datei hinzufügen'],

    ['MGE', 'Maske generieren'],

    ['PRS', 'Vorauswahl'],
    ['CUT', 'Kundentyp'],
    ['PER', 'Person'],
    ['ORG', 'Organisation'],
    ['DEB', 'Debitor'],
    ['CRE', 'Kreditor'],
    ['CCO', 'Buchungskreis'],

    ['LEF', 'Rechtsform'],
    ['SSN', 'Schnittstellennummer'],

    ['CND', 'Kontaktdaten'],
    ['GEI', 'Allgemeine Informationen'],
    ['ADI', 'Adressinformationen'],
    ['PAI', 'Zahlungsinformationen'],
    ['ATF', 'Datei anhängen'],

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
    ['ATB', 'Add file'],
    
    ['MGE', 'Generate mask'],
    ['PRS', 'Preselection'],
    ['CUT', 'Customer type'],
    ['PER', 'Person'],
    ['DEB', 'Debitor'],
    ['CRE', 'Creditor'],
    ['CCO', 'Comapany code'],
    
    ['LEF', 'Legal form'],
    
    ['SSN', 'Interface number'],
    
    ['CND', 'Contact'],
    ['GEI', 'General information'],
    ['ADI', 'Address information'],
    ['PAI', 'Payment information'],
    ['ATF', 'Attach file'],

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

  /**
   * Switches language between English and German.
   */
  switchLanguage() {
    this.currentLanguage = (this.currentLanguage == 'DE' ? 'EN' : 'DE')
  }

  /**
   * Takes an abbreviation and returns the corresponding value.
   * @param abbreviation Map key 
   * @returns Mapping. 
   */
  get(abbreviation: string): string {
    return this.dictionary.get(this.currentLanguage).get(abbreviation);
  }
}
