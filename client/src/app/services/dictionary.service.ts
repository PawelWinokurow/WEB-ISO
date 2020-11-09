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
    ['ABR', 'Abbrechen'],

    ['LOG', 'Anmeldung'],
    ['USR', 'Benutzername'],
    ['PSW', 'Passwort'],

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
    ['MBP', 'Postfach PLZ'],
    ['ZIP', 'Postleitzahl'],
    ['LOC', 'Ort'],
    ['COU', 'Land'],
    ['TEL', 'Telefon'],
    ['FAX', 'Telefax'],
    ['MOB', 'Mobiltelefon'],
    ['EMA', 'E-Mail'],

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
    ['ABR', 'Cancel'],

    ['LOG', 'Log In'],
    ['USR', 'Username'],
    ['PSW', 'Password'],

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
    ['MBP', 'Mailbox Zip'],
    ['ZIP', 'ZIP'],
    ['LOC', 'Location'],
    ['COU', 'Country'],
    ['TEL', 'Phone'],
    ['FAX', 'Fax'],
    ['MOB', 'Mobile phone'],
    ['EMA', 'E-Mail'],

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
