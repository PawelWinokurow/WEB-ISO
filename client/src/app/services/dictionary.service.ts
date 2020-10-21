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
    ['LOG', 'Anmeldung'],
    ['USR', 'Benutzername'],
    ['PSW', 'Passwort'],

    ['BCK', 'Zurück'],
    ['NXT', 'Weiter'],
    ['RST', 'Zurücksetzen'],

    ['PRS', 'Vorauswahl'],
    ['CUT', 'Kundentyp'],
    ['PRV', 'Privatkunde'],
    ['COM', 'Gewerbekunde'],
    ['DEB', 'Debitor'],
    ['KRE', 'Kreditor'],
    ['LEF', 'Rechtsform'],

    ['CND', 'Kontaktdaten'],
    ['CND2', 'Kontaktdaten 2'],
    ['NIF', 'Namensangaben'],
    ['ADR', 'Adresse'],
    ['ADI', 'Weitere Informationen'],
    ['CNA', 'Firma'],
    ['ANI', 'Zus. Namensangaben'],
    ['STR', 'Straße'],
    ['HNU', 'Hausnr.'],
    ['ZIP', 'Postleitzahl'],
    ['LOC', 'Ort'],
    ['COU', 'Land'],
    ['TEL', 'Telefon'],
    ['FAX', 'Telefax'],
    ['MOB', 'Mobiltelefon'],
    ['EMA', 'E-Mail'],

  ])

  dictionaryEN = new Map([
    ['LOG', 'Log In'],
    ['USR', 'Username'],
    ['PSW', 'Password'],

    ['BCK', 'Back'],
    ['NXT', 'Next'],
    ['RST', 'Reset'],

    ['PRS', 'Preselection'],
    ['CUT', 'Customer type'],
    ['PRV', 'Private'],
    ['COM', 'Commercial'],
    ['DEB', 'Debtor'],
    ['KRE', 'Creditor'],
    ['LEF', 'Legal form'],

    ['CND', 'Contact information'],
    ['CND2', 'Contact information 2'],
    ['NIF', 'Name information'],
    ['ADR', 'Address'],
    ['ADI', 'Additional information'],
    ['CNA', 'Company'],
    ['ANI', 'Additional name information'],
    ['STR', 'Street'],
    ['HNU', 'HN'],
    ['ZIP', 'ZIP'],
    ['LOC', 'Location'],
    ['COU', 'Country'],
    ['TEL', 'Phone'],
    ['FAX', 'Fax'],
    ['MOB', 'Mobile phone'],
    ['EMA', 'E-Mail'],
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
